const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const mail = require("../email");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  addAndLoginUser: async (req, res) => {
    try {
      res.clearCookie("token");
      const { name, email, password, phoneno, dob, gender } = req.body;

      const checkEmail = await userModel.findOne({ email });
      if (checkEmail) {
        const checkpaswsword = await bcrypt.compare(
          password,
          checkEmail.password
        );
        if (checkpaswsword) {
          const token = sign(
            { userid: checkEmail._id },
            process.env.secratekey,
            {
              expiresIn: "1h",
            }
          );

          res.cookie("token", token).json({
            message: "login successfully",
          });
        } else {
          res.json({
            message: "This Email is exist but password is incorrect",
          });
        }
      } else {
        const genaratepassword = await bcrypt.hash(password, 10);
        const data = await userModel.create({
          name,
          email,
          password: genaratepassword,
          phoneno,
          dob,
          gender,
        });
        const token = sign({ userid: data._id }, process.env.secratekey, {
          expiresIn: "1h",
        });
        res.cookie("token", token).json({
          message: "login successfully",
        });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  userList: async (req, res) => {
    try {
      const data = await userModel.find();
      res.json({ message: "list of users", data });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  userupdate: async (req, res) => {
    try {
      const { name, email, password, phoneno, dob, gender, id } = req.body;
      const checkUser = await userModel.findById(id);
      if (checkUser) {
        const genaratepassword = await bcrypt.hash(password, 10);

        await userModel.findByIdAndUpdate(
          { _id: id },
          { name, email, password, phoneno: genaratepassword, dob, gender }
        );
        res.json({ message: "this user is updated" });
      } else {
        res.json({ message: "this user id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  userdelete: async (req, res) => {
    try {
      const checkUser = await userModel.findById(req.query.id);
      if (checkUser) {
        await userModel.findByIdAndUpdate(checkUser._id, { isdelated: true });
        res.json({ message: "this user is deleted" });
      } else {
        res.json({ message: "this user id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token").json({ message: "logout is done" });
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      if (email != "") {
        const data = await userModel.findOne({ email });
        if (data) {
          const token = sign({ id: data._id }, process.env.secratekey, {
            expiresIn: "1h",
          });
          const path = `http://localhost:4005/api/user/verifyemail/${token}`;
          mail(email, path);
          console.log("verify link :>> ", path);
          res.json({ message: "verify link is sended this email" });
        } else {
          res.json({ message: "this email is not exist" });
        }
      } else {
        res.json({ message: "email not be empty" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  verifyemail: async (req, res) => {
    try {
      const { token } = req.params;
      const { newpassword } = req.body;

      if (newpassword != "" && newpassword != undefined) {
        const data = verify(token, process.env.secratekey);
        const hashpassword = await bcrypt.hash(newpassword, 10);
        await userModel.findByIdAndUpdate(
          { _id: data.id },
          { password: hashpassword }
        );
        res.json({ message: "password is reseted" });
      } else {
        res.json({ message: "enter newpassword" });
      }
    } catch (error) {
      res.json(error.message);
    }
  },
};
