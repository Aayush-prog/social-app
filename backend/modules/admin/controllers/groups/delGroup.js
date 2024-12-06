const mongoose = require("mongoose");
const axios = require("axios");
const delGroup = async (req, res) => {
  const GrpModel = mongoose.model("grp");
  const AdminModel = mongoose.model("admin");
  const PostModel = mongoose.model("post");

  try {
    const { groupId } = req.params;

    // Check if the group exists
    const group = await GrpModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Delete all posts associated with the group
    await PostModel.deleteMany({ group: groupId });

    // Remove the group from all members' groups array
    await AdminModel.updateMany(
      { groups: groupId },
      { $pull: { groups: groupId } }
    );

    // Delete the group
    await GrpModel.findByIdAndDelete(groupId);
    await axios.delete(`https://api.chatengine.io/chats/${groupId}/`, {
      headers: {
        "PRIVATE-KEY": process.env.project_key,
      },
    });
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = delGroup;
