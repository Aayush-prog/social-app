const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Module code is required"],
      unique: true,
    },
    name: {
      type: String,
      require: [true, "name not defined"],
    },
    description: {
      type: String,
      require: [true, "description not defined"],
    },
    credits: {
      type: Number,
      required: [true, "Number of credits is required"],
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: [true, "Module level is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    image: {
      type: String,
    },
    clg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clg",
      require: [true, "creator not defines"],
    },
    syllabus: {
      type: Array,
    },
  },
  { timestamps: true }
);

const moduleModel = mongoose.model("module", moduleSchema);

module.exports = moduleModel;
