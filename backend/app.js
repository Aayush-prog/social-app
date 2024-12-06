const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

require("dotenv").config();
//routes
const stdRoute = require("./modules/std/std.route");
const clgRoute = require("./modules/college/clg.route");
const restroRoute = require("./modules/restro/restro.route");
const login = require("./handlers/login");
const adminRouter = require("./modules/admin/admin.route");

//models
require("./models/stdModel");
require("./models/clgModel");
require("./models/moduleModel");
require("./models/eventModel");
require("./models/commentModel");
require("./models/grpModel");
require("./models/postModel");
require("./models/restroModel");
require("./models/adminModel");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => console.log("mongo connected"))
  .catch((e) => console.log(e));

app.post("/login", login);
app.use("/admin", adminRouter);
app.use("/std", stdRoute);
app.use("/clg", clgRoute);
app.use("/restro", restroRoute);

app.listen(8000, () => {
  console.log("server started");
});
