const express = require("express");
const userRout = require("./userRouter");
const usercont = require("../controllers/userControllers");
const movieRout = require("./movieRouter");
const auth = require("../middleware/auth");
const index = express.Router();

index.get("/user/verifyemail/:token", usercont.verifyemail);
index.use("/user", auth.tokenVerify, userRout);
index.use("/movie", auth.tokenVerify, movieRout);
module.exports = index;
