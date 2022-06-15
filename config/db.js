const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.dbConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => {
  console.error(error);
});
mongoose.connection.on("open", () => {
  console.log("Database is connected");
});
