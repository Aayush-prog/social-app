const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const restroDashboard = async (req, res) => {
  const RestroModel = mongoose.model("restro");
  const EventModel = mongoose.model("event");
  try {
    const restroId = req.user._id;

    const restro = await RestroModel.findById(restroId);

    if (!restro) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }
    const events = await EventModel.find({ organizer: restro._id });
    res.status(200).json({
      status: "success",
      data: restro,
      events,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = restroDashboard;
