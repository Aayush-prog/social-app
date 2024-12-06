const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const restroLogin = async (req, res) => {
  const RestroModel = mongoose.model("clg");
  const { email, password } = req.body;

  try {
    if (password < 3) throw "password ncannot be less than three";
    if (email < 3) throw "email cannot be less than three";
    const getRestro = await RestroModel.findOne({ email: email });
    if (!getRestro) throw "no such resto registered";
    const matched = await bcrypt.compare(password, getRestro.password);
    if (!matched) throw "passord doesnot match";
  } catch (e) {
    res.status(400).json({ msg: e });
    return;
  }

  const getRestroForToken = await RestroModel.findOne({ email: email });
  const token = jwt.sign(
    {
      _id: getRestroForToken._id,
    },
    process.env.restro_salt
  );

  res.status(200).json({ statuts: "restro loggd in", token });
};

module.exports = restroLogin;
