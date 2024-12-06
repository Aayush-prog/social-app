const mongoose = require("mongoose");

const getAllModule = async (req, res) => {
  const ModuleModel = mongoose.model("module");

  try {
    const modules = await ModuleModel.find();

    if (modules.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No modules found",
      });
    }

    res.status(200).json({
      status: "success",
      data: modules,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching modules",
    });
  }
};

module.exports = getAllModule;
