const express = require("express");
require("./config/db");
const mainRoute = require("./routes/index");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const uploaded = require("express-fileupload");
const cors = require("cors");

const app = express();
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(uploaded());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", mainRoute);

app.listen(4005, () => {
  console.log("Server is started");
});
