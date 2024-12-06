const mongoose = require("mongoose");

const getCollegeById = async (req, res) => {
  const CollegeModel = mongoose.model("clg");
  const { id } = req.params;

  try {
    const college = await CollegeModel.findById(id);

    if (!college) {
      return res
        .status(404)
        .json({ status: "failed", msg: "College not found" });
    }

    res.status(200).json({ status: "success", data: college });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

module.exports = getCollegeById;
