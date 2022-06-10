const { verify } = require("jsonwebtoken");
const valid = require("validator");
const userAccessWithoutLogin = ["/checkuser", "/forgot"];
const userAccess = [
  "/allmovies",
  "/moviebyid",
  "/newticket",
  "/ticketsbooked",
  "/addpayment",
];
const passport = require("passport");
require("dotenv").config();

module.exports = {
  userValidation: async (req, res, next) => {
    try {
      const { name, email, password, phone, dob, gender } = req.body;
      if (valid.isEmpty(name)) {
        res.json({ messsage: "Name not be empty" });
      }
      if (valid.isEmpty(email)) {
        res.json({ messsage: "Email not be empty" });
      }
      if (valid.isEmpty(password)) {
        res.json({ messsage: "Password not be empty" });
      }
      if (valid.isEmpty(phone)) {
        res.json({ messsage: "Phone not be empty" });
      }
      if (valid.isEmpty(dob)) {
        res.json({ messsage: "dob not be empty" });
      }
      if (valid.isEmpty(gender)) {
        res.json({ messsage: "gender not be empty" });
      }
      if (!valid.isEmail(email)) {
        res.json({ messsage: "This Email is not a correct format" });
      }
      if (phone.length < 10) {
        res.json({ messsage: "Phone no should be 10 digit" });
      } else {
        next();
      }
    } catch (error) {
      res.json({ messsage: error.messsage });
    }
  },
  authVerify: async (req, res, next) => {
    try {
      if (req.user) {
        // console.log(req.user);
        if (!req.user.isDelated) {
          if (req.user.isAdmin) {
            next();
          } else if (userAccess.indexOf(req.path) !== -1) {
            next();
          } else {
            res.json({ messsage: "You have not access of this api" });
          }
        } else {
          res.json({ messsage: "Your not exist in db" });
        }
      } else {
        // res.json({ messsage: "you have not access of this api" });
        if (userAccessWithoutLogin.indexOf(req.path) !== -1) {
          next();
        } else {
          passport.authenticate("jwt", { session: false });
          next();
          // res.json({ messsage: "This url is not existing" });
        }
      }
    } catch (error) {
      res.json({ messsage: error.messsage });
    }
  },
  movieValidation: async (req, res, next) => {
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
    if (valid.isEmpty(name)) {
      res.json({ messsage: " Movie name not be empty" });
    }
    if (valid.isEmpty(decription)) {
      res.json({ messsage: " Movie decription not be empty" });
    }
    if (valid.isEmpty(language)) {
      res.json({ messsage: " Movie language not be empty" });
    }
    if (valid.isEmpty(releaseDate)) {
      res.json({ messsage: " Movie releaseDate not be empty" });
    }
    if (valid.isEmpty(rating)) {
      res.json({ messsage: " Rating not be zero" });
    }
    if (valid.isEmpty(director)) {
      res.json({ messsage: " Movie director not be empty" });
    }
    if (valid.isEmpty(producers)) {
      res.json({ messsage: " Movie producers not be empty" });
    }
    if (valid.isEmpty(casting)) {
      res.json({ messsage: " Movie casting not be empty" });
    } else {
      next();
    }
  },
  ticketValidation: async (req, res, next) => {
    const { name, seats, moviedate } = req.body;
    if (valid.isEmpty(name)) {
      res.json({ messsage: "movie name field not be empty" });
    }
    if (valid.isEmpty(seats)) {
      res.json({ messsage: "seats field not be empty" });
    }
    if (valid.isEmpty(moviedate)) {
      res.json({ messsage: "moviedate field not be empty" });
    } else {
      next();
    }
  },
};
