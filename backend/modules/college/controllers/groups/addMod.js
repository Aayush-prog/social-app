const mongoose = require("mongoose");

const addModerator = async (req, res) => {
  const GrpModel = mongoose.model("grp");
  const StdModel = mongoose.model("std");

  try {
    const { groupId, userId } = req.params;

    // Check if the group exists
    const group = await GrpModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user making the request is the creator of the group
    if (group.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to add moderators to this group",
      });
    }

    // Check if the user to be added as moderator exists
    const user = await StdModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already a moderator
    if (group.mods.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is already a mods of this group" });
    }

    // Add the user as a mods
    group.mods.push(userId);
    group.members.pull(userId);
    await group.save();

    res.status(200).json({ message: "Moderator added successfully" });
  } catch (error) {
    console.error("Error adding mods:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addModerator;
