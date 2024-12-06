const mongoose = require("mongoose");
const path = require("path");
const createModule = async (req, res) => {
  const ModuleModel = mongoose.model("module");
  const ClgModel = mongoose.model("clg");
  const { code, name, description, credits, level, department, syllabus } =
    req.body;
  console.log("here");
  console.log(req.body);
  console.log(req.file);
  try {
    if (!code || !name || !description || !credits || !level || !department) {
      throw "Missing required fields";
    }
    const image = req.file ? path.basename(req.file.path) : null;
    const newModule = await ModuleModel.create({
      code,
      name,
      description,
      credits,
      level,
      department,
      clg: req.user._id,
      syllabus,
      image,
    });

    await ClgModel.updateOne(
      { _id: req.user._id },
      { $push: { modules: newModule._id } }
    );

    res.status(201).json({
      status: "success",
      message: "Module created successfully",
      data: newModule,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};

module.exports = createModule;
