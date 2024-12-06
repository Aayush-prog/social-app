const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");
const stdRegister = async (req, res) => {
  const StdModel = mongoose.model("std");
  const { name, email, phone, password, confirmpass } = req.body;
  const image = req.file ? path.basename(req.file.path) : null;
  console.log(req.body);
  try {
    if (name.length < 3) throw "name should bbe longer than 3";
    if (email.length < 3) throw "email should bbe longer than 3";
    if (password != confirmpass) {
      throw "password and confirm password donot match";
    }
  } catch (e) {
    res.status(400).json({ status: "failed", msg: e });
    return;
  }

  const encPass = await bcrypt.hash(password, 10);
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
  try {
    await StdModel.create({
      name,
      email,
      phone,
      password: encPass,
      image,
      chatid: response.id,
    });
  } catch (e) {
    res.status(400).json({ status: "failed", msg: e.message });

    return;
  }

  res
    .status(200)
    .json({ status: "success", msg: "registered", data: response.data });
};
module.exports = stdRegister;
