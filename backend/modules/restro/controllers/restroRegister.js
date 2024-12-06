const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const restroRegister = async (req, res) => {
  const RestroModel = mongoose.model("restro");
  console.log("aaipuge");
  const { name, address, password, confirmpass, email } = req.body;
  console.log(req.body);
  const image = req.file ? path.basename(req.file.path) : null;
  try {
    if (name.length < 3) throw "Name is not provided";
    if (password != confirmpass)
      throw "password nad confirm password do not match";
    if (address.length < 3) throw "address cannot be less than three";
    if (email.length < 3) throw "email cannot be less than three";
  } catch (e) {
    res.status(400).json({ msg: e });
    return;
  }

  try {
    const encPass = await bcrypt.hash(password, 10);
    const created = await RestroModel.create({
      name,
      address,
      email,
      password: encPass,
      image,
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
    return;
  }

  res.status(200).json({
    status: "succes registration of college",
  });
};

module.exports = restroRegister;
