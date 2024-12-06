const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const stdLogin = async (req, res) => {
  const StdModel = mongoose.model("std");
  const { email, password } = req.body;
  try {
    if (!email) throw "no email";
    if (!password) throw "no password";
    const getStd = await StdModel.findOne({
      email,
    });
    if (!getStd) throw "no such user";
    const match = await bcrypt.compare(password, getStd.password);

    if (!match) throw "password doesnot macth";
  } catch (e) {
    res.status(400).json({ status: "failed", msg: e });
    return;
  }

  const getStdForToken = await StdModel.findOne({
    email,
  });

  const r = await axios.get("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": process.env.project_id,
      "User-Name": email,
      "User-Secret": getStdForToken.password,
    },
  });
  const token = jwt.sign({ _id: getStdForToken._id }, process.env.jwt_salt);

  res.status(200).json({
    status: "success",
    token,
    data: r.data,
  });
};
module.exports = stdLogin;
