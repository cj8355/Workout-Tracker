const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
//! require("./seeders/seed"); // Either npm run seed or keep this in here uncommented and it will run the seed
const apiRoutes = require("./routes/api");
const viewRoutes = require("./routes/views");
const PORT = process.env.PORT || 3005;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myFirstDatabase", {
  useNewUrlParser: true,
  useFindAndModify: false
});

//require(apiRoute)(app);
app.use(apiRoutes);
app.use(viewRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});