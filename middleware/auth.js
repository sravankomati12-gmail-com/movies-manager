const valid = require("validator");
require("dotenv").config();

const userAccess = [
  "/allmovies",
  "/moviebyid",
  "/newticket",
  "/ticketsbooked",
  "/addpayment",
  "/moviesearch",
];

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
        res.json({ messsage: "The password is not empty" });
      }
      if (valid.isEmpty(phone)) {
        res.json({ messsage: "Phone no is not empty" });
      }
      if (valid.isEmpty(dob)) {
        res.json({ messsage: "Dob is not empty" });
      }
      if (valid.isEmpty(gender)) {
        res.json({ messsage: "Gender is not empty" });
      }
      if (!valid.isEmail(email)) {
        res.json({ messsage: "This email is not in a correct format" });
      }
      if (phone.length < 10) {
        res.json({ messsage: "Phone no should be 10 digit" });
      } else {
        next();
      }
    } catch (error) {
      res.json({ messsage: "All fields must be define" });
    }
  },
  authVerify: async (req, res, next) => {
    try {
      if (req.user) {
        if (!req.user.isDelated) {
          if (req.user.isAdmin) {
            next();
          } else if (userAccess.indexOf(req.path) !== -1) {
            next();
          } else {
            res.json({ messsage: "You have no access to this api" });
          }
        } else {
          res.json({ messsage: "You did not exist in database" });
        }
      } else {
        res.json({ messsage: "This URL is not existing" });
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
    try {
      if (valid.isEmpty(name)) {
        res.json({ messsage: " The movie name is not empty" });
      }
      if (valid.isEmpty(decription)) {
        res.json({ messsage: "The movie description not be empty" });
      }
      if (valid.isEmpty(language)) {
        res.json({ messsage: "The movie language is not empty" });
      }
      if (valid.isEmpty(releaseDate)) {
        res.json({ messsage: "The movie release date is not empty" });
      }
      if (valid.isEmpty(rating)) {
        res.json({ messsage: "Rating is not zero" });
      }
      if (valid.isEmpty(director)) {
        res.json({ messsage: " Movie directors are not empty" });
      }
      if (valid.isEmpty(producers)) {
        res.json({ messsage: " Movie producers are not empty" });
      }
      if (valid.isEmpty(casting)) {
        res.json({ messsage: " Movie casting is not empty" });
      } else {
        next();
      }
    } catch (error) {
      res.json({ messsage: "All fields must be define" });
    }
  },
  ticketValidation: async (req, res, next) => {
    const { name, seats, moviedate } = req.body;
    try {
      if (valid.isEmpty(name)) {
        res.json({ messsage: "The movie name field is not empty" });
      }
      if (valid.isEmpty(seats)) {
        res.json({ messsage: "Seats field not be empty" });
      }
      if (valid.isEmpty(moviedate)) {
        res.json({ messsage: "The movie date field is not empty" });
      } else {
        next();
      }
    } catch (error) {
      res.json({ messsage: "All fields must be define" });
    }
  },
  paymentValidation: async (req, res, next) => {
    const { acountno, payopt, currency, timmingslot, username, ticket } =
      req.body;

    try {
      if (valid.isEmpty(acountno)) {
        res.json({ messsage: "The acountno field is not empty" });
      }
      if (valid.isEmpty(payopt)) {
        res.json({ messsage: "Payopt field not be empty" });
      }
      if (valid.isEmpty(currency)) {
        res.json({ messsage: "The currency field is not empty" });
      }
      if (valid.isEmpty(timmingslot)) {
        res.json({ messsage: "The timmingslot field is not empty" });
      }
      if (valid.isEmpty(username)) {
        res.json({ messsage: "The username field is not empty" });
      }
      if (valid.isEmpty(ticket)) {
        res.json({ messsage: "The ticket field is not empty" });
      } else {
        next();
      }
    } catch (error) {
      res.json({ messsage: "All fields must be define" });
    }
  },
};
