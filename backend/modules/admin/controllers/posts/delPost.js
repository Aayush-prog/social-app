const mongoose = require("mongoose");

const deletePost = async (req, res) => {
  const PostModel = mongoose.model("post");
  const GrpModel = mongoose.model("grp");
  const AdminModel = mongoose.model("admin");

  try {
    const { postId } = req.params;

    // Find the post
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const group = await GrpModel.findOne({ _id: post.group });

    // Remove the post from the group's posts array
    await GrpModel.findByIdAndUpdate(
      { _id: post.group },
      { $pull: { posts: postId } }
    );

    // Remove the post from the user's posts array
    await AdminModel.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { posts: postId } }
    );

    // Delete the post
    await PostModel.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deletePost;
