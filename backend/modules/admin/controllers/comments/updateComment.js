const mongoose = require("mongoose");

const updateComment = async (req, res) => {
  const CommentModel = mongoose.model("cmnt");
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({
        status: "error",
        message: "Comment content is required",
      });
    }

    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      { content },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while updating the comment",
    });
  }
};

module.exports = updateComment;
