const mongoose = require("mongoose");

const getCommentById = async (req, res) => {
  const CommentModel = mongoose.model("cmnt");
  const StdModel = mongoose.model("std");
  const CollegeModel = mongoose.model("clg");
  const { commentId } = req.params;

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }
    var creator;
    switch (comment.commentorType) {
      case "std":
        creator = await StdModel.findById({ _id: comment.author });
        break;
      case "clg":
        creator = await CollegeModel.findById({ _id: comment.author });
        break;
    }
    res.status(200).json({
      status: "success",
      data: comment,
      creator,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching the comment",
    });
  }
};

module.exports = getCommentById;
