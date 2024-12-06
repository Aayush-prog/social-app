const mongoose = require("mongoose");

const deleteComment = async (req, res) => {
  const CommentModel = mongoose.model("cmnt");
  const AdminModel = mongoose.model("admin");
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

    await CommentModel.findByIdAndDelete(commentId);

    await AdminModel.findByIdAndUpdate(
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
