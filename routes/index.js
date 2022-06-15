const express = require("express");
const userRoute = require("./userRouter");
const movieRoute = require("./movieRouter");
const ticketRoute = require("./ticketRouter");
const paymentRoute = require("./paymentRouter");
const userCont = require("../controllers/userControllers");
const userMiddleware = require("../middleware/auth");
const passport = require("passport");

const index = express();
const auth = passport.authenticate("jwt", { session: false });
// index.get("/user/verifyemail/:token", userCont.verifyEmail);
index.use("/user", userRoute);
index.use("/movie", [auth, userMiddleware.authVerify], movieRoute);
index.use("/ticket", [auth, userMiddleware.authVerify], ticketRoute);
index.use("/paymnet", [auth, userMiddleware.authVerify], paymentRoute);

module.exports = index;
