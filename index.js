const express = require("express");
require("./config/db");
const cookieParser = require("cookie-parser");
const mainRoute = require("./routes/index");
const uploaded = require("express-fileupload");

const app = express();
app.use(uploaded());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", mainRoute);

app.listen(4005, () => {
  console.log("Server is started");
});
