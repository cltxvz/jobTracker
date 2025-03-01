const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/auth"); // Ensure users are authenticated

// Get all events for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ userID: req.user.id }); // Fetch only the user's events
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Add a new event
router.post("/", authMiddleware, async (req, res) => {
    try {
      const { title, date, time } = req.body;
      if (!title || !date || !time) {
        return res.status(400).json({ msg: "Title, date, and time are required" });
      }
  
      const newEvent = new Event({
        userID: req.user.id,
        title,
        date,
        time,
      });
  
      const savedEvent = await newEvent.save();
      res.json(savedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  });

// Edit an event
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, date } = req.body;
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Ensure the event belongs to the logged-in user
    if (event.userID.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    event.title = title || event.title;
    event.date = date || event.date;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete an event
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      let event = await Event.findById(req.params.id);
  
      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }
  
      // Ensure the event belongs to the logged-in user
      if (event.userID.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }
  
      await event.deleteOne();
      res.json({ msg: "Event deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  });

module.exports = router;
