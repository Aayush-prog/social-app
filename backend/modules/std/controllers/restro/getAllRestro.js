const mongoose = require("mongoose");

const getAllRestro = async (req, res) => {
  const RestroModel = mongoose.model("restro");

  try {
    const restro = await RestroModel.find();

    if (restro.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No restro found",
      });
    }

    res.status(200).json({
      status: "success",
      data: restro,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching restro",
    });
  }
};

module.exports = getAllRestro;
