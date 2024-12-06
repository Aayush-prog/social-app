const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const { get } = require("http");
const createGroup = async (req, res) => {
  const GrpModel = mongoose.model("grp");
  const ClgModel = mongoose.model("clg");
  try {
    const { name, description } = req.body;
    const creator = req.user._id;
    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }
    const image = req.file ? path.basename(req.file.path) : null;
    const getClg = await ClgModel.findById(creator);
    const response = await axios.put(
      `https://api.chatengine.io/chats/`,
      {
        title: name,
        is_direct_chat: false,
      },
      {
        headers: {
          "Project-ID": process.env.project_id,
          "User-Name": getClg.email,
          "User-Secret": getClg.password,
        },
      }
    );
    const newGroup = await GrpModel.create({
      name,
      description,
      creator,
      creatorType: "clg",
      members: [creator],
      image,
      chatID: response.data.id,
    });

    await ClgModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { groups: newGroup._id },
      }
    );

    res.status(201).json({
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createGroup;
