const mongoose = require("mongoose");

const getModuleById = async (req, res) => {
  const ModuleModel = mongoose.model("module");
  const { moduleId } = req.params;

  try {
    const module = await ModuleModel.findById(moduleId);

    if (!module) {
      return res.status(404).json({
        status: "error",
        message: "Module not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: module,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching the module",
    });
  }
};

module.exports = getModuleById;
