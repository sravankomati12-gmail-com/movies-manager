const express = require("express");
require("./config/db");
const mainRoute = require("./routes/index");
const passport = require("passport");
const uploaded = require("express-fileupload");

const app = express();
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(uploaded());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", mainRoute);

app.listen(4005, () => {
  console.log("Server is started");
});
