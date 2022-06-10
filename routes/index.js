const express = require("express");
const userRout = require("./userRouter");
const movieRout = require("./movieRouter");
const ticketRout = require("./ticketRouter");
const paymentRout = require("./paymentRouter");
const userCont = require("../controllers/userControllers");
const userMiddleware = require("../middleware/auth");
const passport = require("passport");

const index = express.Router();
const auth = passport.authenticate("jwt", { session: false });
index.get("/user/verifyemail/:token", userCont.verifyEmail);
index.use("/user", userMiddleware.authVerify, userRout);
index.use("/movie", [auth, userMiddleware.authVerify], movieRout);
index.use("/ticket", [auth, userMiddleware.authVerify], ticketRout);
index.use("/paymnet", [auth, userMiddleware.authVerify], paymentRout);

module.exports = index;
