const nodeMailer = require("nodemailer");
require("dotenv").config();

const transPoter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});
function sendMail(toEmail, data) {
  var mailTransport = {
    from: process.env.email,
    to: toEmail,
    subject: "Verify email for reset password",
    text: `Verify link: ${data}`,
  };
  transPoter.sendMail(mailTransport, (err) => {
    if (err) {
      console.log("Err :>> ", err.message);
    } else {
      console.log("Email is sended");
      // res1.status(200).json({ message: "mail is Succfully sended" });
    }
  });
}

module.exports = sendMail;
