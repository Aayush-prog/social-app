const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");
const clgRegister = async (req, res) => {
  const ClgModel = mongoose.model("clg");

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
  const encPass = await bcrypt.hash(password, 10);
  try {
    const created = await ClgModel.create({
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
  const response = await axios.post(
    `https://api.chatengine.io/users/`,
    {
      username: email,
      secret: encPass,
      email: email,
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1],
    },
    {
      headers: {
        "PRIVATE-KEY": process.env.project_key,
      },
    }
  );
  res.status(200).json({
    status: "succes registration of college",
  });
};

module.exports = clgRegister;
