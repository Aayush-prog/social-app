const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const settings = async (req, res) => {
  console.log("settings");
  const ClgModel = mongoose.model("clg");
  const { id } = req.params;
  const updates = req.body;

  try {
    if (updates.password) {
      const encPass = await bcrypt.hash(updates.password, 10);
      updates.password = encPass;
    }
    console.log(updates.password);
    const clg = await ClgModel.findById(id);
    await axios.patch(
      `https://api.chatengine.io/users/${clg.chatid}/`,
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
    const updatedCollege = await ClgModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCollege) {
      return res
        .status(404)
        .json({ status: "failed", msg: "College not found" });
    }

    res.status(200).json({ status: "success", data: updatedCollege });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

module.exports = settings;
