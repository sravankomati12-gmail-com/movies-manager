const express = require("express");
const usercontrol = require("../controllers/userControllers");
const auth = require("../middleware/auth");
const userrouter = express.Router();

userrouter.post("/checkuser", auth.userValidation, usercontrol.addAndLoginUser);
userrouter.post("/update", auth.userValidation, usercontrol.userupdate);
userrouter.get("/list", usercontrol.userList);
userrouter.delete("/delete", usercontrol.userdelete);
userrouter.get("/logout", usercontrol.logout);
userrouter.post("/forgot", usercontrol.forgotPassword);
userrouter.get("/verify/:token", usercontrol.verifyemail);

module.exports = userrouter;
