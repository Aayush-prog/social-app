const mongoose = require("mongoose");

const getEventById = async (req, res) => {
  const EventModel = mongoose.model("event");
  const { id } = req.params;

  try {
    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching the event",
    });
  }
};

module.exports = getEventById;
