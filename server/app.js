const express = require("express");
const app = express();
const searchRoutes = require("./src/routes/search");
const userRoutes = require("./src/routes/user");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb://TM:123456tm@ds125472.mlab.com:25472/git-hub-repo-finder`
);

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type:"*/*"}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// Our routes added here

app.use("/search", searchRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Are you sure its the right url?");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message }
  });
});
module.exports = app;
