const express = require("express");
const restroRegister = require("./controllers/restroRegister");
const restroLogin = require("./controllers/restroLogin");
const restroauth = require("../../middleware/restroauth");
const getEventById = require("./controllers/event/getEventById");
const createEvent = require("./controllers/event/createEvent");
const updateEvent = require("./controllers/event/updateEvent");
const delEvent = require("./controllers/event/delEvent");
const uploadMiddleware = require("../../middleware/upload");
const getRestroById = require("./controllers/getRestro");
const restroDashboard = require("./controllers/restroDashboard");
const settings = require("./controllers/settings");
const restroRouter = express.Router();

restroRouter.post("/register", uploadMiddleware, restroRegister);
restroRouter.post("/login", restroLogin);
restroRouter.post("/getRestro/:id", getRestroById);

restroRouter.use(restroauth);
restroRouter.get("/dashboard", restroDashboard);
restroRouter.patch("/settings/:id", uploadMiddleware, settings);
restroRouter.get("/event/:eventId", getEventById);
restroRouter.post("/createEvent", uploadMiddleware, createEvent);
restroRouter.patch("/updateEvent/:eventId", uploadMiddleware, updateEvent);
restroRouter.delete("/deleteEvent/:eventId", delEvent);

module.exports = restroRouter;
