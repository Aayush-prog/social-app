const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const { get } = require("http");
const createGroup = async (req, res) => {
  const GrpModel = mongoose.model("grp");
  const AdminModel = mongoose.model("admin");
  try {
    const { name, description } = req.body;
    const creator = req.user._id;
    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }
    const image = req.file ? path.basename(req.file.path) : null;
    const getAdmin = await AdminModel.findById(creator);
    const response = await axios.put(
      `https://api.chatengine.io/chats/`,
      {
        title: name,
        is_direct_chat: false,
      },
      {
        headers: {
          "Project-ID": process.env.project_id,
          "User-Name": getAdmin.email,
          "User-Secret": getAdmin.password,
        },
      }
    );
    const newGroup = await GrpModel.create({
      name,
      description,
      creator,
      creatorType: "admin",
      members: [creator],
      image,
      chatID: response.data.id,
    });

    await AdminModel.findByIdAndUpdate(
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
