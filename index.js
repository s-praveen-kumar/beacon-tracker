/*******************Imports**************/
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const registerRouter = require("./routes/registerRouter");
const authRouter = require("./routes/authRouter");
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

app.use(express.json());

app.use(authRouter);
app.use(registerRouter);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
