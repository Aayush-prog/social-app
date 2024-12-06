const mongoose = require("mongoose");

const getStudentById = async (req, res) => {
  const StdModel = mongoose.model("std");
  const { id } = req.params;
  console.log("getstd");
  console.log(id);
  try {
    const student = await StdModel.findById(id);

    if (!student) {
      return res
        .status(404)
        .json({ status: "failed", msg: "Student not found" });
    }

    res.status(200).json({ status: "success", data: student });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

module.exports = getStudentById;
