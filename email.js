const nodemailer = require("nodemailer");

require("dotenv").config();
const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

function sendMail(toemail, data) {
  var mailtransport = {
    from: process.env.email,
    to: toemail,
    subject: "verify email for reset password",
    text: `verify link: ${data}`,
  };
  transpoter.sendMail(mailtransport, (err) => {
    if (err) {
      console.log("err :>> ", err.message);
    } else {
      console.log("email is sended");
      // res1.status(200).json({ message: "mail is Succfully sended" });
    }
  });
}
module.exports = sendMail;
