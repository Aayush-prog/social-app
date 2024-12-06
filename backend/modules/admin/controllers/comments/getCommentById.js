const mongoose = require("mongoose");

const getCommentById = async (req, res) => {
  const CommentModel = mongoose.model("cmnt");
  const { commentId } = req.params;

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching the comment",
    });
  }
};

module.exports = getCommentById;
