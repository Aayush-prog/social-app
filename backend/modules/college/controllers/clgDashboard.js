const mongoose = require("mongoose");

const clgDashboard = async (req, res) => {
  const ClgModel = mongoose.model("clg");
  const ModuleModel = mongoose.model("module");
  const EventModel = mongoose.model("event");
  const GroupModel = mongoose.model("grp");
  const clg = await ClgModel.findOne({
    _id: req.user._id,
  });
  const modules = await ModuleModel.find({ clg: clg._id });
  const events = await EventModel.find({ organizer: clg._id });
  const groups = await GroupModel.find({ creator: clg._id });

  res.status(200).json({ data: clg, modules, events, groups });
};

module.exports = clgDashboard;
