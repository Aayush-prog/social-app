const mongoose = require("mongoose");

const stdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name not specified"],
    },
    email: {
      type: String,
      require: [true, "Email not specified"],
      unique: true,
    },
    phone: {
      type: Number,
      require: [true, "phone not specified"],
    },
    password: {
      type: String,
      require: [true, "password not set"],
    },
    image: {
      type: String,
    },
    groups: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "grp",
    },
    posts: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "post",
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "cmnt",
    },
    chatid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const stdModel = mongoose.model("std", stdSchema);

module.exports = stdModel;
