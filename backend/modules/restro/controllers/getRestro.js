const mongoose = require("mongoose");

const getRestroById = async (req, res) => {
  const RestroModel = mongoose.model("restro");
  const { id } = req.params;

  try {
    const restro = await RestroModel.findById(id);

    if (!restro) {
      return res
        .status(404)
        .json({ status: "failed", msg: "Restaurant not found" });
    }

    res.status(200).json({ status: "success", data: restro });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

module.exports = getRestroById;
