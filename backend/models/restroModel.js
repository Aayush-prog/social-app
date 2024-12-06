const mongoose = require("mongoose");

const restroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is not provided"],
    },
    email: {
      type: String,
      require: [true, "email not defined"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password not defined"],
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      require: [true, "address is not given"],
    },
    cuisine: {
      type: String,
    },
    menu: {
      type: Array,
    },
    image: {
      type: String,
    },
    events: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "event",
    },
  },
  { timeseries: true }
);

const restroModel = mongoose.model("restro", restroSchema);

module.exports = restroModel;
