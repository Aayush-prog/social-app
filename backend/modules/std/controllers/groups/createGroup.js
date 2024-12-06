const mongoose = require("mongoose");

const createGroup = async (req, res) => {
  const GrpModel = mongoose.model("grp");
  const StdModel = mongoose.model("std");
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }
    const image = req.file ? req.file.path : null;
    const newGroup = await GrpModel.create({
      name,
      description,
      creator,
      creatorType: "std",
      members: [creator],
      image,
    });

    await StdModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { groups: newGroup._id },
      }
    );

    res.status(201).json({
      message: "Group created successfully",
      group: savedGroup,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createGroup;
