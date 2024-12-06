const mongoose = require("mongoose");

const createComment = async (req, res) => {
  console.log("in create comment");
  const CommentModel = mongoose.model("cmnt");
  const PostModel = mongoose.model("post");
  const StdModel = mongoose.model("std");
  const { groupId, postId } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const newComment = await CommentModel.create({
      author: req.user._id,
      commentorType: "std",
      content,
      group: groupId,
    });
    await PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $push: { comments: newComment._id },
      }
    );
    await StdModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { comments: newComment._id },
      }
    );

    res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createComment;
