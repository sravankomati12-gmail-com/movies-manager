const express = require("express");
const userControl = require("../controllers/userControllers");
const auth = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/checkuser", auth.userValidation, userControl.addAndLoginUser);
userRouter.post("/update", auth.userValidation, userControl.userUpdate);
userRouter.get("/list", userControl.userList);
userRouter.delete("/delete", userControl.userDelete);
userRouter.post("/forgot", userControl.forgotPassword);

module.exports = userRouter;
