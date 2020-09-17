/*******************Imports**************/
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const registerRouter = require("./routes/registerRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const authHelper = require("./utils/authHelper");
/******************Constants************/
const PORT = process.env.PORT || 3000; //Use port defined in Environement variable PORT if defined or use 5000
const DB_URI = "mongodb://localhost:27017/beaconDB";

//Connect to db
mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to database");
  }
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyparser.json());

app.use(authRouter);

app.use(authHelper.authHandler);
app.use(registerRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
