const mongoose = require("mongoose");

const stdDashboard = async (req, res) => {
  const StdModel = mongoose.model("std");
  const _id = req.user._id;
  console.log("in dashboard");
  const getStd = await StdModel.findOne({
    _id: _id,
  });
  res.status(200).send({ data: getStd });
};

module.exports = stdDashboard;
