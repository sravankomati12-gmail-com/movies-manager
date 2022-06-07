const express = require("express");
const moviecontrol = require("../controllers/movieController");
const auth = require("../middleware/auth");

const movierouter = express.Router();
movierouter.post("/addmovie", auth.movievalidation, moviecontrol.addMovie);
movierouter.post(
  "/updatemovie",
  auth.movievalidation,
  moviecontrol.updatemovie
);
movierouter.get("/allmovies", moviecontrol.getAllMovie);
movierouter.get("/moviebyid", moviecontrol.getMovieById);
movierouter.delete("/deletemovie", moviecontrol.deletemovie);
module.exports = movierouter;
