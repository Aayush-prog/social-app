const mongoose = require("mongoose");

const deleteComment = async (req, res) => {
  const CommentModel = mongoose.model("cmnt");
  const StdModel = mongoose.model("std");
  const { commentId } = req.params;

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }

    const PostModel = mongoose.model("post");
    const GroupModel = mongoose.model("grp");

    const post = await PostModel.findOne({ comments: commentId });
    const group = await GroupModel.findOne({ _id: comment.group });

    if (
      comment.author.toString() !== req.user._id.toString() ||
      post.author.toString() !== req.user._id.toString() ||
      group.owner.toString() !== req.user._id.toString() ||
      !group.mods.includes(req.user._id)
    ) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete this comment",
      });
    }

    await CommentModel.findByIdAndDelete(commentId);

    await StdModel.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { comments: commentId } }
    );

    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while deleting the comment",
    });
  }
};

module.exports = deleteComment;
