const express = require("express");
const userControl = require("../controllers/userControllers");
const authv = require("../middleware/auth");
const passport = require("passport");

const userRouter = express.Router();

const auth = passport.authenticate("jwt", { session: false });
userRouter.post(
  "/checkuser",
  authv.userValidation,
  userControl.addAndLoginUser
);
userRouter.post(
  "/update",
  [auth, authv.authVerify],
  authv.userValidation,
  userControl.userUpdate
);
userRouter.get("/list", [auth, authv.authVerify], userControl.userList);
userRouter.delete("/delete", [auth, authv.authVerify], userControl.userDelete);
userRouter.post(
  "/forgot",
  [auth, authv.authVerify],
  userControl.forgotPassword
);

module.exports = userRouter;
