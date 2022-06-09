const express = require("express");
const movieControl = require("../controllers/movieController");
const auth = require("../middleware/auth");

const movieRouter = express.Router();
movieRouter.post("/addmovie", auth.movieValidation, movieControl.addMovie);
movieRouter.post(
  "/updatemovie",
  auth.movieValidation,
  movieControl.updateMovie
);
movieRouter.get("/allmovies", movieControl.getAllMovie);
movieRouter.get("/moviebyid", movieControl.getMovieById);
movieRouter.delete("/deletemovie", movieControl.deleteMovie);

module.exports = movieRouter;
