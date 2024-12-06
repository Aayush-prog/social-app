const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Post content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "authorType",
      required: [true, "Post author is required"],
    },
    authorType: {
      type: String,
      required: true,
      enum: ["clg", "std", "admin"],
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "grp",
      required: [true, "Post must belong to a group"],
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "cmnt",
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
