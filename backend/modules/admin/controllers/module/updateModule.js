const mongoose = require("mongoose");

const updateModule = async (req, res) => {
  const ModuleModel = mongoose.model("module");
  const { moduleId } = req.params;
  const { code, name, description, credits, level, department, syllabus } =
    req.body;

  try {
    const module = await ModuleModel.findById(moduleId);

    if (!module) {
      return res.status(404).json({
        status: "error",
        message: "Module not found",
      });
    }

    const image = req.file ? path.basename(req.file.path) : null;
    const updatedModule = await ModuleModel.findByIdAndUpdate(
      moduleId,
      {
        code,
        name,
        description,
        credits,
        level,
        department,
        syllabus,
        image,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Module updated successfully",
      data: updatedModule,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || "An error occurred while updating the module",
    });
  }
};

module.exports = updateModule;
