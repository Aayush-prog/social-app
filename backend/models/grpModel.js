const mongoose = require("mongoose");

const grpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "std",
      },
    ],
    mods: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "creatorType",
      required: true,
    },
    creatorType: {
      type: String,
      required: true,
      enum: ["clg", "std", "admin"],
    },
    posts: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "posts",
    },
    chatID: {
      type: String,
      require: [true, "chat id not given"],
    },
  },
  { timestamps: true }
);

const grp = mongoose.model("grp", grpSchema);

module.exports = grp;
