/*******************Imports**************/
const express = require("express");
const app = express();

/******************Constants************/
const PORT = process.env.PORT || 5000; //Use port defined in Environement variable PORT if defined or use 5000

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
