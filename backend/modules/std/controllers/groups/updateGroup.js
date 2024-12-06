const mongoose = require("mongoose");

const updateGroup = async (req, res) => {
  const GrpModel = mongoose.model("grp");

  try {
    const { groupId } = req.params;
    const { name, description } = req.body;
    const image = req.file ? req.file.path : null;
    // Find the group by ID
    const group = await GrpModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is the creator of the group
    if (group.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this group" });
    }

    // Update the group
    const updatedGroup = await GrpModel.findByIdAndUpdate(
      { _id: groupId },
      { name, description, image },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Group updated successfully",
      group: updatedGroup,
    });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateGroup;
