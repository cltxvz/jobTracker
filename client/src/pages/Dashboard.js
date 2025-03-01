import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("appliedDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showPasswords, setShowPasswords] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const navigate = useNavigate();

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/jobs", {
          headers: { "x-auth-token": token },
        });
        setJobs(res.data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchJobs();
  }, [navigate]);

  // Retrieve stored toast message (from AddJob)
  useEffect(() => {
    const storedMessage = localStorage.getItem("toastMessage");
    const storedType = localStorage.getItem("toastType");

    if (storedMessage) {
      setToastMessage(storedMessage);
      setToastType(storedType || "success");

      // Remove stored message after displaying
      setTimeout(() => {
        setToastMessage("");
        localStorage.removeItem("toastMessage");
        localStorage.removeItem("toastType");
      }, 3000);
    }
  }, []);

  // Toggle Password Visibility
  const togglePasswordVisibility = (jobId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (jobId) => {
    setJobToDelete(jobId);
    setShowModal(true);
  };

  // Close Modal Without Deleting
  const closeDeleteModal = () => {
    setJobToDelete(null);
    setShowModal(false);
  };

  // DELETE Job Function
  const handleDelete = async () => {
    if (!jobToDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/jobs/${jobToDelete}`, {
        headers: { "x-auth-token": token },
      });

      setJobs(jobs.filter((job) => job._id !== jobToDelete));
      setToastMessage("Job deleted successfully!");
      setToastType("success");
    } catch (error) {
      console.error(error);
      setToastMessage("Failed to delete job");
      setToastType("error");
    }

    // Close Modal and Reset State
    setShowModal(false);
    setJobToDelete(null);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // FILTER & SORT LOGIC
  const filteredJobs = jobs
    .filter((job) => {
      return (
        (filterStatus ? job.status === filterStatus : true) &&
        (searchTerm
          ? job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.position.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
      );
    })
    .sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];

      if (sortField === "appliedDate") {
        fieldA = new Date(a.appliedDate);
        fieldB = new Date(b.appliedDate);
      } else {
        fieldA = fieldA.toLowerCase();
        fieldB = fieldB.toLowerCase();
      }

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="d-flex flex-column min-vh-100">
      <PageHeader />
      <div className="container mt-5 flex-grow-1">

        {/* Buttons: Add Job & Logout */}
        <div className="d-flex justify-content-center gap-4 mb-5">
          <button className="btn btn-light border-dark" onClick={() => navigate("/add-job")}>➕ Add New Job</button>
          <button className="btn btn-light border-dark" onClick={() => navigate("/calendar")}>📅 Open Calendar</button>
          <button className="btn btn-light border-dark" onClick={handleLogout}>🚪 Logout</button>
        </div>

        {/* Search & Filters */}
        <div className="mt-3 d-flex gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Company or Position"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Applied">Applied</option>
            <option value="Assessment Pending">Assessment Pending</option>
            <option value="Assessment Completed">Assessment Completed</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select className="form-select" value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="appliedDate">Sort by Date Applied</option>
            <option value="company">Sort by Company</option>
            <option value="status">Sort by Status</option>
          </select>
          <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {filteredJobs.length > 0 ? (
          <table className="table table-striped table-bordered mt-4">
            <thead className="table-dark">
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Job Link</th>
                <th>Portal Link</th>
                <th>Username</th>
                <th>Password</th>
                <th>Date Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.company}</td>
                  <td>{job.position}</td>
                  <td>
                    <span className={`badge bg-${job.status === "Rejected" ? "danger" : job.status === "Offer" ? "success" : "primary"}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>
                    {job.jobLink ? (
                      <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-sm">
                        View Job
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {job.portalLink ? (
                      <a href={job.portalLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                        Access Portal
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{job.username ? job.username : "N/A"}</td>
                  <td>
                    {job.password ? (
                      <span>
                        <input
                          type={showPasswords[job._id] ? "text" : "password"}
                          value={job.password}
                          readOnly
                          className="form-control form-control-sm d-inline w-auto"
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm ms-2"
                          onClick={() => togglePasswordVisibility(job._id)}
                        >
                          {showPasswords[job._id] ? "🙈" : "👁️"}
                        </button>
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{new Date(job.appliedDate).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/edit-job/${job._id}`)}>✏️ Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(job._id)}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-warning mt-4">No job applications found.</div>
        )}
      </div>
      <Footer />

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this job?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification - Stays for 3 sec */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: toastType === "success" ? "#4CAF50" : "#F44336",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "5px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
            fontSize: "16px",
            zIndex: 1000,
            transition: "opacity 0.5s ease-in-out",
            opacity: 1,
          }}
        >
          {toastMessage}
        </div>
      )}

    </div>
  );
}

export default Dashboard;
