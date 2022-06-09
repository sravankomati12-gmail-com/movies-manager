const express = require("express");
const userRout = require("./userRouter");
const userCont = require("../controllers/userControllers");
const movieRout = require("./movieRouter");
const userMiddleware = require("../middleware/auth");
const passport = require("passport");

const index = express.Router();
const auth = passport.authenticate("jwt", { session: false });
index.get("/user/verifyemail/:token", userCont.verifyEmail);
index.use("/user", userMiddleware.tokenVerify, userRout);
index.use("/movie", [auth, userMiddleware.tokenVerify], movieRout);
index.use("/user", auth.tokenVerify, userRout);
index.use("/movie", auth.tokenVerify, movieRout);

module.exports = index;
