const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sravan_vision:Sravan%40123@cluster0.vr3xu.mongodb.net/movies?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("error", (error) => {
  console.error(error);
});
mongoose.connection.on("open", () => {
  console.log("database is connected");
});
