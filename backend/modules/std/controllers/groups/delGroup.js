const mongoose = require("mongoose");

const delGroup = async (req, res) => {
  const GrpModel = mongoose.model("grp");
  const StdModel = mongoose.model("std");
  const PostModel = mongoose.model("post");

  try {
    const { groupId } = req.params;

    // Check if the group exists
    const group = await GrpModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is the creator of the group
    if (group.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this group" });
    }

    // Delete all posts associated with the group
    await PostModel.deleteMany({ group: groupId });

    // Remove the group from all members' groups array
    await StdModel.updateMany(
      { groups: groupId },
      { $pull: { groups: groupId } }
    );

    // Delete the group
    await GrpModel.findByIdAndDelete(groupId);

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = delGroup;
