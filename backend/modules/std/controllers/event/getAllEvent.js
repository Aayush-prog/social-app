const mongoose = require("mongoose");

const getAllEvent = async (req, res) => {
  const EventModel = mongoose.model("event");

  try {
    const events = await EventModel.find();

    if (events.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No events found",
      });
    }

    res.status(200).json({
      status: "success",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message || "An error occurred while fetching events",
    });
  }
};

module.exports = getAllEvent;
