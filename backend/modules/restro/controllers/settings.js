const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const settings = async (req, res) => {
  console.log("settings");
  const RestroModel = mongoose.model("restro");
  const { id } = req.params;
  const updates = req.body;

  try {
    if (updates.password) {
      const encPass = await bcrypt.hash(updates.password, 10);
      updates.password = encPass;
    }
    console.log(updates.password);
    const updatedRestro = await RestroModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedRestro) {
      return res
        .status(404)
        .json({ status: "failed", msg: "Restro not found" });
    }

    res.status(200).json({ status: "success", data: updatedRestro });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

module.exports = settings;
