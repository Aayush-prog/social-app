const mongoose = require("mongoose");

const getRestroById = async (req, res) => {
  const RestroModel = mongoose.model("restro");
  const { restroId } = req.params;

  try {
    const restro = await RestroModel.findById({ _id: restroId });

    if (!restro) {
      return res.status(404).json({
        status: "error",
        message: "Module not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: restro,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching the restro",
    });
  }
};

module.exports = getRestroById;
