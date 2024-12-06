const mongoose = require("mongoose");

const createPost = async (req, res) => {
  console.log("here");
  const PostModel = mongoose.model("post");
  const GrpModel = mongoose.model("grp");
  const StdModel = mongoose.model("std");
  try {
    const { groupId } = req.params;
    const { content } = req.body;

    // Check if the group exists
    const group = await GrpModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is a member of the group
    if (!group.members.includes(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    // Create the new post
    const newPost = await PostModel.create({
      content,
      author: req.user._id,
      authorType: "std",
      group: groupId,
    });

    // Update the group's posts array
    await GrpModel.findByIdAndUpdate(
      {
        _id: groupId,
      },
      {
        $push: { posts: newPost._id },
      }
    );

    // Update the user's posts array
    await StdModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { posts: newPost._id },
      }
    );

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createPost;
