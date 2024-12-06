const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "commentorType",
    },
    commentorType: {
      type: String,
      required: true,
      enum: ["clg", "std"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
    },
    group: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "grp",
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("cmnt", commentSchema);

module.exports = commentModel;
