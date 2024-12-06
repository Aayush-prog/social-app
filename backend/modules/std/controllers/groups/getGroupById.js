const mongoose = require("mongoose");

const getGroupById = async (req, res) => {
  const GrpModel = mongoose.model("grp");
  const StdModel = mongoose.model("std");
  try {
    const { groupId } = req.params;

    // Find the group by ID
    const group = await GrpModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.mods && group.mods.includes(req.user._id)) {
      return res.status(200).json({ group, type: "mod" });
    }

    if (group.members && group.members.includes(req.user._id)) {
      return res.status(200).json({ group, type: "member" });
    }

    res.status(200).json({ group, type: "" });
  } catch (error) {
    console.error("Error retrieving group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getGroupById;
