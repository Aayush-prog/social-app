const express = require("express");
const stdRouter = express.Router();
const stdRegister = require("./controllers/stdRegister");
const stdLogin = require("./controllers/stdLogin");
const auth = require("../../middleware/auth");
const stdDashboard = require("./controllers/stdDashboard");
const getAllModule = require("./controllers/module/getAllModule");
const getAllEvent = require("./controllers/event/getAllEvent");
const getModuleById = require("./controllers/module/getModuleById");
const getEventById = require("./controllers/event/getEventById");
const getAllGroups = require("./controllers/groups/getAllGroup");
const getGroupById = require("./controllers/groups/getGroupById");
const getAllPosts = require("./controllers/posts/getAllPost");
const createPost = require("./controllers/posts/createPost");
const updatePost = require("./controllers/posts/updatePost");
const deletePost = require("./controllers/posts/delPost");
const createGroup = require("./controllers/groups/createGroup");
const updateGroup = require("./controllers/groups/updateGroup");
const delGroup = require("./controllers/groups/delGroup");
const getAllComment = require("./controllers/comments/getAllComment");
const getCommentById = require("./controllers/comments/getCommentById");
const createComment = require("./controllers/comments/createComment");
const updateComment = require("./controllers/comments/updateComment");
const deleteComment = require("./controllers/comments/delComment");
const getPostById = require("./controllers/posts/getPostById");
const uploadMiddleware = require("../../middleware/upload");
const getAllRestro = require("./controllers/restro/getAllRestro");
const getRestroById = require("./controllers/restro/getRestroById");
const getStudentById = require("./controllers/getStudent");
const joinGroup = require("./controllers/groups/joinGroup");
const settings = require("./controllers/settings");
const leaveGroup = require("./controllers/groups/leaveGroup");

stdRouter.post("/register", uploadMiddleware, stdRegister);
stdRouter.post("/login", stdLogin);

stdRouter.get("/getStudent/:id", getStudentById);

stdRouter.use(auth);
stdRouter.get("/dashboard", stdDashboard);
stdRouter.patch("/settings/:id", uploadMiddleware, settings);
stdRouter.get("/module", getAllModule);
stdRouter.get("/event", getAllEvent);
stdRouter.get("/restro", getAllRestro);
stdRouter.get("/module/:moduleId", getModuleById);
stdRouter.get("/event/:eventId", getEventById);
stdRouter.get("/restro/:restroId", getRestroById);

//group
stdRouter.get("/group", getAllGroups);
stdRouter.get("/group/:groupId", getGroupById);
stdRouter.get("/joinGroup/:groupId", joinGroup);
stdRouter.get("/leaveGroup/:groupId", leaveGroup);
stdRouter.post("/createGroup", uploadMiddleware, createGroup);
stdRouter.patch("/updateGroup", uploadMiddleware, updateGroup);
stdRouter.delete("/delGroup", delGroup);

//post
stdRouter.get("/post", getAllPosts);
stdRouter.get("/post/:postId", getPostById);
stdRouter.post("/createPost/:groupId", createPost);
stdRouter.patch("/updatePost", updatePost);
stdRouter.delete("/delPost", deletePost);

//comment
stdRouter.get("/comment", getAllComment);
stdRouter.get("/comment/:commentId", getCommentById);
stdRouter.post("/:groupId/:postId/createComment", createComment);
stdRouter.patch("/updateComment", updateComment);
stdRouter.delete("/delComment", deleteComment);

module.exports = stdRouter;
