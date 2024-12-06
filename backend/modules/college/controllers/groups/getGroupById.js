const mongoose = require("mongoose");

const getGroupById = async (req, res) => {
  const GrpModel = mongoose.model("grp");

  try {
    const { groupId } = req.params;

    // Find the group by ID
    const group = await GrpModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error retrieving group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getGroupById;
