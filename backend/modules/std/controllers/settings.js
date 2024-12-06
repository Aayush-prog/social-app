const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const settings = async (req, res) => {
  console.log("settings");
  const StdModel = mongoose.model("std");
  const { id } = req.params;
  const updates = req.body;

  try {
    if (updates.password) {
      const encPass = await bcrypt.hash(updates.password, 10);
      updates.password = encPass;
    }
    console.log(updates.password);
    const std = await StdModel.findById(id);
    await axios.patch(
      `https://api.chatengine.io/users/${std.chatid}/`,
      {
        username: updates.email,
        secret: updates.password,
        email: updates.email,
        first_name: updates.name.split(" ")[0],
        last_name: updates.name.split(" ")[1],
      },
      {
        headers: {
          "PRIVATE-KEY": process.env.project_key,
        },
      }
    );
    const updatedStudent = await StdModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ status: "failed", msg: "Student not found" });
    }

    res.status(200).json({ status: "success", data: updatedStudent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

module.exports = settings;
