const moviemodel = require("../models/moviemodel");
const fs = require("fs");

module.exports = {
  addMovie: async (req, res) => {
    try {
      const {
        name,
        decription,
        language,
        releasedate,
        rating,
        director,
        producers,
        casting,
      } = req.body;
      const { image } = req.files;
      const imagename = Date.now() + "_" + image.name;
      const imagestore = "./public/" + imagename;
      image.mv(imagestore, async (err) => {
        if (err) {
          console.log(err);
        } else {
          const imagepath = `http://localhost:4005/${imagename}`;
          await moviemodel.create({
            name,
            decription,
            language,
            releasedate,
            rating,
            director,
            producers,
            casting,
            details: imagepath,
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
      const data = await moviemodel
        .find()
        .select({ name: 1, _id: 1, details: 1 });
      res.json({ message: "list of movies", data });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  getMovieById: async (req, res) => {
    try {
      const data = await moviemodel.findOne({ _id: req.query.id });
      if (data) {
        res.json({ message: "get movie by id", data });
      } else {
        res.json({ message: "this movie id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  updatemovie: async (req, res) => {
    try {
      const {
        name,
        decription,
        language,
        releasedate,
        rating,
        director,
        producers,
        casting,
        id,
      } = req.body;
      const { image } = req.files;
      const imagename = Date.now() + "_" + image.name;
      const imagestore = "./public/" + imagename;
      const data = await moviemodel.findOne({ _id: id });
      if (data) {
        fs.unlink(`./public/${data.details.split("4005/")[1]}`, (err, data) => {
          if (err) {
            res.status(404).json({ message: err.message });
          } else {
            image.mv(imagestore, async (err) => {
              if (err) {
                console.log(err);
              } else {
                const imagepath = `http://localhost:4005/${imagename}`;
                await moviemodel.findByIdAndUpdate(
                  { _id: id },
                  {
                    name,
                    decription,
                    language,
                    releasedate,
                    rating,
                    director,
                    producers,
                    casting,
                    details: imagepath,
                  }
                );
                res.json({ message: "This movie details is updated " });
              }
            });
          }
        });
      } else {
        res.json({ message: "this movie id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  deletemovie: async (req, res) => {
    try {
      const data = await moviemodel.findOne({ _id: req.query.id });
      if (data) {
        fs.unlink(
          `./public/${data.details.split("4005/")[1]}`,
          async (err, data) => {
            if (err) {
              res.status(404).json({ message: err.message });
            } else {
              await moviemodel.findByIdAndDelete(req.query.id);
              res.json({ message: "this movie is deleted" });
            }
          }
        );
      } else {
        res.json({ message: "this movie id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};
