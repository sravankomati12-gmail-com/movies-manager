const movieModel = require("../models/moviemodel");
const fs = require("fs");

module.exports = {
  addMovie: async (req, res) => {
    try {
      const {
        name,
        decription,
        language,
        releaseDate,
        rating,
        director,
        producers,
        casting,
      } = req.body;
      const { image } = req.files;
      const imageName = Date.now() + "_" + image.name;
      const imageStore = "./public/" + imageName;
      image.mv(imageStore, async (err) => {
        if (err) {
          console.log(err);
        } else {
          const imagePath = `http://localhost:4005/${imageName}`;
          await movieModel.create({
            name,
            decription,
            language,
            releaseDate,
            rating,
            director,
            producers,
            casting,
            image: imagePath,
          });
          res.json({ message: "New movies is added" });
        }
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  getAllMovie: async (req, res) => {
    try {
      const data = await movieModel
        .find()
        .select({ name: 1, _id: 1, details: 1 });
      res.json({ message: "List of movies", data });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  getMovieById: async (req, res) => {
    try {
      const data = await movieModel.findOne({ _id: req.query.id });
      if (data) {
        res.json({ message: "Get movie by id", data });
      } else {
        res.json({ message: "This movie id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  updateMovie: async (req, res) => {
    try {
      const {
        name,
        decription,
        language,
        releaseDate,
        rating,
        director,
        producers,
        casting,
        id,
      } = req.body;
      const { image } = req.files;
      const imageName = Date.now() + "_" + image.name;
      const imageStore = "./public/" + imageName;
      const data = await movieModel.findOne({ _id: id });
      if (data) {
        fs.unlink(`./public/${data.image.split("4005/")[1]}`, (err, data) => {
          if (err) {
            res.status(404).json({ message: err.message });
          } else {
            image.mv(imageStore, async (err) => {
              if (err) {
                console.log(err);
              } else {
                const imagePath = `http://localhost:4005/${imageName}`;
                await movieModel.findByIdAndUpdate(
                  { _id: id },
                  {
                    name,
                    decription,
                    language,
                    releaseDate,
                    rating,
                    director,
                    producers,
                    casting,
                    image: imagePath,
                  }
                );
                res.json({ message: "This movie details is updated " });
              }
            });
          }
        });
      } else {
        res.json({ message: "This movie id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const data = await movieModel.findOne({ _id: req.query.id });
      if (data) {
        fs.unlink(
          `./public/${data.details.split("4005/")[1]}`,
          async (err, data) => {
            if (err) {
              res.status(404).json({ message: err.message });
            } else {
              await movieModel.findByIdAndDelete(req.query.id);
              res.json({ message: "This movie is deleted" });
            }
          }
        );
      } else {
        res.json({ message: "This movie id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};
