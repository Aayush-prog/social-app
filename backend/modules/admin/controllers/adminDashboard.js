const mongoose = require("mongoose");

const adminDashboard = async (req, res) => {
  const AdminModel = mongoose.model("admin");
  const ClgModel = mongoose.model("clg");
  const ModuleModel = mongoose.model("module");
  const EventModel = mongoose.model("event");
  const GroupModel = mongoose.model("grp");
  const StdModel = mongoose.model("std");
  const RestroModel = mongoose.model("restro");

  const admin = await AdminModel.findById({ _id: req.user._id });
  const std = await StdModel.find();
  const restro = await RestroModel.find();
  const clg = await ClgModel.find();
  const modules = await ModuleModel.find();
  const events = await EventModel.find();
  const groups = await GroupModel.find();

  res
    .status(200)
    .json({ data: admin, std, restro, clg, modules, events, groups });
};

module.exports = adminDashboard;
