const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
    },
    image: {
      type: String,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "organizerType",
      required: [true, "Event organizer is required"],
    },
    organizerType: {
      type: String,
      required: true,
      enum: ["clg", "restro", "std", "admin"],
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;
