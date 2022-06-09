const express = require("express");
const userRout = require("./userRouter");
const userCont = require("../controllers/userControllers");
const movieRout = require("./movieRouter");
const userMiddleware = require("../middleware/auth");
const passport = require("passport");

const index = express.Router();
const auth = passport.authenticate("jwt", { session: false });
index.get("/user/verifyemail/:token", userCont.verifyEmail);
<<<<<<< HEAD
index.use("/user", userMiddleware.tokenVerify, userRout);
index.use("/movie", [auth, userMiddleware.tokenVerify], movieRout);
=======
index.use("/user", auth.tokenVerify, userRout);
index.use("/movie", auth.tokenVerify, movieRout);
>>>>>>> 23c0a932ccaf2d4f5a32eccceab7fe13e93a13b7

module.exports = index;
