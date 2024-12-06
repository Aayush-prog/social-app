const mongoose = require("mongoose");
const axios = require("axios");
const delGroup = async (req, res) => {
  const GrpModel = mongoose.model("grp");
  const ClgModel = mongoose.model("clg");
  const PostModel = mongoose.model("post");

  try {
    const { groupId } = req.params;

    // Check if the group exists
    const group = await GrpModel.findById(groupId);
    const getClg = await ClgModel.findById(group.creator);
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
    await ClgModel.updateMany(
      { groups: groupId },
      { $pull: { groups: groupId } }
    );

    await axios.delete(`https://api.chatengine.io/chats/${group.chatID}/`, {
      headers: {
        "Project-ID": process.env.project_id,
        "User-Name": getClg.email,
        "User-Secret": getClg.password,
      },
    });
    // Delete the group
    await GrpModel.findByIdAndDelete(groupId);

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = delGroup;
