/*******************Imports**************/
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const socketio = require("./utils/socket");

const checkpointRouter = require("./routes/checkpointRouter");
const routeRouter = require("./routes/routeRouter");
const vehicleRouter = require("./routes/vehicleRouter");
const trackingRouter = require("./routes/trackingRouter");
const testRouter = require("./routes/testRouter");
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

const server = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

socketio.init(server);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials","true");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyparser.json());
app.use(authHelper.authHandler);

app.use(authRouter);

app.use("/cp",checkpointRouter);
app.use("/vehicle", vehicleRouter);
app.use("/route", routeRouter);
app.use("/user", userRouter);
app.use("/test", testRouter);
app.use(trackingRouter);
