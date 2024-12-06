const mongoose = require("mongoose");

const delModule = async (req, res) => {
  const ModuleModel = mongoose.model("module");
  const AdminModel = mongoose.model("admin");
  const { moduleId } = req.params;

  try {
    const module = await ModuleModel.findById(moduleId);

    if (!module) {
      return res.status(404).json({
        status: "error",
        message: "Module not found",
      });
    }

    await ModuleModel.findByIdAndDelete(moduleId);

    await AdminModel.updateOne(
      { _id: req.user._id },
      { $pull: { modules: new mongoose.Types.ObjectId(`{moduleId}`) } }
    );

    res.status(200).json({
      status: "success",
      message: "Module deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while deleting the module",
    });
  }
};

module.exports = delModule;
