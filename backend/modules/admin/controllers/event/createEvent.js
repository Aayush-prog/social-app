const mongoose = require("mongoose");
const path = require("path");
const createEvent = async (req, res) => {
  const AdminModel = mongoose.model("admin");
  const EventModel = mongoose.model("event");
  try {
    const { title, description, date, location, category } = req.body;

    if (!title || !description || !date || !location || !category) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const image = req.file ? path.basename(req.file.path) : null;
    const newEvent = await EventModel.create({
      title,
      description,
      date,
      location,
      category,
      organizer: req.user._id,
      organizerType: "admin",
      image,
    });

    await AdminModel.updateOne(
      { _id: req.user._id },
      { $push: { events: newEvent._id } }
    );

    res
      .status(201)
      .json({ msg: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = createEvent;
