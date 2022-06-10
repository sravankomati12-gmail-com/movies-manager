const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const mail = require("../email");
require("dotenv").config();

module.exports = {
  addAndLoginUser: async (req, res) => {
    try {
      const { name, email, password, phone, dob, gender } = req.body;

      const checkEmail = await userModel.findOne({ email });
      if (checkEmail) {
        const checkPaswsword = await bcrypt.compare(
          password,
          checkEmail.password
        );
        if (checkPaswsword) {
          const token = sign(
            { userid: checkEmail._id },
            process.env.secretKey,
            {
              expiresIn: "5h",
            }
          );
          res.json({
            userName: checkEmail.name,
            admin: checkEmail.isAdmin,
            token: `Bearer ${token}`,
            message: "Your are now login",
          });
        } else {
          res.json({
            message: "This email is exist but password is incorrect",
          });
        }
      } else {
        const genaratePassword = await bcrypt.hash(password, 10);
        const data = await userModel.create({
          name,
          email,
          password: genaratePassword,
          phone,
          dob,
          gender,
        });
        const token = sign({ userid: data._id }, process.env.secretKey, {
          expiresIn: "5h",
        });
        res.json({
          userName: data.name,
          admin: data.isAdmin,
          token: `Bearer ${token}`,
          message: "Your are now login",
        });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  userList: async (req, res) => {
    try {
      const data = await userModel.find();
      res.json({ message: "List of users", data });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  userUpdate: async (req, res) => {
    try {
      const { name, email, password, phone, dob, gender, id } = req.body;
      const checkUser = await userModel.findById(id);
      if (checkUser) {
        const genaratePassword = await bcrypt.hash(password, 10);

        await userModel.findByIdAndUpdate(
          { _id: id },
          { name, email, password: genaratePassword, phone, dob, gender }
        );
        res.json({ message: "This user is updated" });
      } else {
        res.json({ message: "This user id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  userDelete: async (req, res) => {
    try {
      const checkUser = await userModel.findById(req.query.id);
      if (checkUser) {
        await userModel.findByIdAndUpdate(checkUser._id, { isDelated: true });
        res.json({ message: "This user is deleted" });
      } else {
        res.json({ message: "This user id is not exist" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      if (email != "") {
        const data = await userModel.findOne({ email });
        if (data) {
          const token = sign({ id: data._id }, process.env.secretKey, {
            expiresIn: "1h",
          });
          const path = `http://localhost:4005/api/user/verifyemail/${token}`;
          mail(email, path);
          console.log("Verify link :>> ", path);
          res.json({ message: "Verify link is sended this email" });
        } else {
          res.json({ message: "This email is not exist" });
        }
      } else {
        res.json({ message: "Email not be empty" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      if (newPassword != "" && newPassword != undefined) {
        const data = verify(token, process.env.secretKey);
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await userModel.findByIdAndUpdate(
          { _id: data.id },
          { password: hashPassword }
        );
        res.json({ message: "Password is reseted" });
      } else {
        res.json({ message: "Enter newPassword" });
      }
    } catch (error) {
      res.json(error.message);
    }
  },
};
