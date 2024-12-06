const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  modules: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: "module",
  },
  events: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: "event",
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
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = AdminModel;
