const mongoose = require("mongoose");

const delEvent = async (req, res) => {
  const EventModel = mongoose.model("event");
  const AdminModel = mongoose.model("admin");
  const { eventId } = req.params;
  console.log(eventId);
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    await EventModel.findByIdAndDelete(eventId);

    await AdminModel.updateOne(
      { _id: req.user._id },
      { $pull: { events: eventId } }
    );

    res.status(200).json({
      status: "success",
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while deleting the event",
    });
  }
};

module.exports = delEvent;
