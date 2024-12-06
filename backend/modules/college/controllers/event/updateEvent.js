const mongoose = require("mongoose");
const path = require("path");
const updateEvent = async (req, res) => {
  const EventModel = mongoose.model("event");
  const { id } = req.params;
  console.log(id);
  const { title, description, date, location, category, status } = req.body;

  try {
    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete this event",
      });
    }
    const image = req.file ? path.basename(req.file.path) : null;
    const updatedEvent = await EventModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        location,
        category,
        status,
        image,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || "An error occurred while updating the event",
    });
  }
};

module.exports = updateEvent;
