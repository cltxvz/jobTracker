import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import CalendarHeader from "../components/CalendarHeader";
import Footer from "../components/Footer";

const API_BASE_URL = "https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/events";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "" });
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  // Fetch events
  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}`, {
        headers: { "x-auth-token": token },
      });

      // Convert time to 12-hour format
      const formattedEvents = res.data.map((event) => ({
        id: event._id,
        title: `${event.title} (${convertTo12Hour(event.time)})`,
        start: event.date,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Convert 24h to 12h format
  const convertTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  // Handle date selection
  const handleDateClick = (selected) => {
    const dateStr = selected.dateStr;

    if (selectedDate === dateStr) {
      // Deselect if clicked again
      setSelectedDate(null);
      setEventsOnSelectedDate([]);
      setShowButtons(false);
    } else {
      // Select new day
      setSelectedDate(dateStr);
      setEventsOnSelectedDate(events.filter((event) => event.start === dateStr));
      setShowButtons(true);
    }
  };

  // Hide buttons when clicking outside the calendar
  const handleClickOutside = (event) => {
    if (!event.target.closest(".fc-daygrid-day")) {
      setSelectedDate(null);
      setShowButtons(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Open Add Event Modal
  const openAddEventModal = () => {
    if (!selectedDate) return;
    setNewEvent({ title: "", date: selectedDate, time: "" });
    setShowModal(true);
  };

  // Add Event
  const handleAddEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.time.trim()) {
      alert("Event title and time cannot be empty!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE_URL}`, newEvent, {
        headers: { "x-auth-token": token },
      });

      const updatedEvent = {
        id: res.data._id,
        title: `${res.data.title} (${convertTo12Hour(res.data.time)})`,
        start: res.data.date,
      };

      setEvents([...events, updatedEvent]);
      if (selectedDate === updatedEvent.start) {
        setEventsOnSelectedDate([...eventsOnSelectedDate, updatedEvent]);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Open Delete Modal
  const openDeleteModal = () => {
    if (eventsOnSelectedDate.length === 0) return;
    setShowDeleteModal(true);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Delete Event
  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/${eventId}`, {
        headers: { "x-auth-token": token },
      });

      setEvents(events.filter((event) => event.id !== eventId));
      setEventsOnSelectedDate(eventsOnSelectedDate.filter((event) => event.id !== eventId));

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <CalendarHeader />
      <div className="container mt-5 flex-grow-1 mb-5">
        <div className="d-flex justify-content-center align-items-center mb-4">
          <button className="btn btn-light border-dark" onClick={() => navigate("/dashboard")}>🔙 Back to Dashboard</button>
        </div>

        <p className="text-center">Click on a day to add/delete events!</p>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          dayHeaderContent={(info) => (
            <span style={{fontWeight: "bold", textDecoration: "none" }}>{info.text}</span>
          )}
          dayCellContent={(info) => (
            <span
              style={{
                fontWeight: "bold",
                display: "block",
                textDecoration: "none",
                backgroundColor: selectedDate === info.date.toISOString().split("T")[0] ? "#28a74530" : "transparent",
                borderRadius: "5px",
                padding: "3px",
              }}
            >
              {info.dayNumberText}
            </span>
          )}
        />
      </div>
      <Footer />

      {/* Add & Delete Buttons */}
      {showButtons && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3 d-flex gap-3" style={{ zIndex: 1050 }}>
          <button className="btn btn-success" onClick={openAddEventModal}>Add Event</button>
          {eventsOnSelectedDate.length > 0 && (
            <button className="btn btn-danger" onClick={openDeleteModal}>Delete Event</button>
          )}
        </div>
      )}

      {/* Add Event Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Event</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Event Title</label>
                <input type="text" className="form-control" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

                <label className="form-label mt-2">Event Time</label>
                <input type="time" className="form-control" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={handleAddEvent}>Add Event</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Event</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                {eventsOnSelectedDate.map((event) => (
                  <button key={event.id} className="btn btn-danger d-block w-100 my-1" onClick={() => handleDeleteEvent(event.id)}>
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
