const mongoose = require("mongoose");

const clgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name not defined"],
    },
    address: {
      type: String,
      require: [true, "address not defined"],
    },
    email: {
      type: String,
      require: [true, "email not defined"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password not defined"],
    },
    image: {
      type: String,
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
    chatid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const clgModel = mongoose.model("clg", clgSchema);
