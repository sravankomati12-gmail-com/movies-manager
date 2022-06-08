const { verify } = require("jsonwebtoken");
const valid = require("validator");
const userModel = require("../models/usermodel");
const userAccessWithoutLogin = ["/checkuser", "/logout", "/forgot"];
const userAccess = ["/allmovies"];
require("dotenv").config();

module.exports = {
  userValidation: async (req, res, next) => {
    try {
      const { name, email, password, phoneno, dob, gender } = req.body;
      if (valid.isEmpty(name)) {
        res.json({ messsage: "Name not be empty" });
      }
      if (valid.isEmpty(email)) {
        res.json({ messsage: "Email not be empty" });
      }
      if (valid.isEmpty(password)) {
        res.json({ messsage: "Password not be empty" });
      }
      if (valid.isEmpty(phoneno)) {
        res.json({ messsage: "Phoneno not be empty" });
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
      if (phoneno.length < 10) {
        res.json({ messsage: "Phone no should be 10 digit" });
      } else {
        next();
      }
    } catch (error) {
      res.json({ messsage: error.messsage });
    }
  },
  tokenVerify: async (req, res, next) => {
    try {
      if (userAccessWithoutLogin.indexOf(req.path) != -1) {
        next();
      } else {
        if (req.cookies.token != undefined) {
          const data = verify(req.cookies.token, process.env.secratekey);

          const checkAdmin = await userModel.findById(data.userid);

          if (checkAdmin.isDelated) {
            res.json({ messsage: "Your not exist" });
          } else {
            req.user = checkAdmin;
            if (checkAdmin.isAdmin) {
              next();
            } else {
              if (userAccess.indexOf(req.path) != -1) {
                next();
              } else {
                res.json({ messsage: "You have acces for this api" });
              }
            }
          }
        } else {
          res.json({ messsage: "You have not login" });
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
      releasedate,
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
    if (valid.isEmpty(releasedate)) {
      res.json({ messsage: " Movie releasedate not be empty" });
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
};
