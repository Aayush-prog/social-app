const mongoose = require("mongoose");

const updatePost = async (req, res) => {
  const PostModel = mongoose.model("post");
  const GrpModel = mongoose.model("grp");

  try {
    const { postId } = req.params;
    const { content } = req.body;

    // Find the post
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the group exists
    const group = await GrpModel.findById(post.group);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Update the post
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { content },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updatePost;
