const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const clgLogin = async (req, res) => {
  const ClgModel = mongoose.model("clg");
  const { email, password } = req.body;

  try {
    if (password < 3) throw "password ncannot be less than three";
    if (email < 3) throw "email cannot be less than three";
    const getClg = await ClgModel.findOne({ email: email });
    if (!getClg) throw "no such college registered";
    const matched = await bcrypt.compare(password, getClg.password);
    if (!matched) throw "passord doesnot match";
  } catch (e) {
    res.status(400).json({ msg: e });
    return;
  }

  const getClgForToken = await ClgModel.findOne({ email: email });
  const r = await axios.get("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": process.env.project_id,
      "User-Name": email,
      "User-Secret": getClgForToken.password,
    },
  });
  const token = jwt.sign(
    {
      _id: getClgForToken._id,
    },
    process.env.clg_salt
  );

  res.status(200).json({ statuts: "college loggd in", token });
};

module.exports = clgLogin;
