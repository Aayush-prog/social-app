const mongoose = require("mongoose");

const getAllGroups = async (req, res) => {
  const GrpModel = mongoose.model("grp");

  try {
    // Retrieve all groups from the database
    const groups = await GrpModel.find();

    res.status(200).json({
      message: "Groups retrieved successfully",
      groups: groups,
    });
  } catch (error) {
    console.error("Error retrieving groups:", error);
    res.status(500).json({ data: "Internal server error" });
  }
};

module.exports = getAllGroups;
