/*******************Imports**************/
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Checkpoint = require("./models/checkpoint");
const registerRouter = require("./routes/registerRouter");
/******************Constants************/
const PORT = process.env.PORT || 5000; //Use port defined in Environement variable PORT if defined or use 5000
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
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(registerRouter);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

require("./tests/modelTest")();
