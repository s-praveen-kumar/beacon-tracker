const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { requireLogin } = require("../utils/authHelper");
const authHelper = require("../utils/authHelper");

const SALT_ROUNDS = 10;

router.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    //Username and Password entered
    User.findOne({ _id: req.body.username }, (err, user) => {
      if (err) {
        //Error querrying database
        console.log("Error login:" + err);
        res.status(500).json({ success: false, msg: "Failed Login" });
      } else {
        if (user) {
          //User with given name found
          if (bcrypt.compareSync(req.body.password, user.hash)) {
            //Password matches
            const authToken = authHelper.generateAccessToken({
              username: user._id,
              role: user.role,
            });
            res
              .status(200)
              .json({ success: true, msg: "Logged in", authToken });
          } else {
            //Password doesn't match
            res
              .status(200)
              .json({ success: false, msg: "Incorrect username / Password" });
          }
        } else {
          //User not found
          res.status(200).json({ success: false, msg: "User not found" });
        }
      }
    });
  } else {
    //Missing username / password
    res.status(400).json({
      success: false,
      msg: "Missing username / password",
    });
  }
});

router.post("/createUser", (req, res) => {
  if (!authHelper.requireLogin(req, res))
    return;
  if (req.body.authData.role != "admin") {
    return res
      .status(403)
      .json({ success: false, msg: "Only admins can create users" });
  }

  if (
    req.body.name &&
    req.body.username &&
    req.body.password &&
    req.body.role
  ) {
    const user = new User({
      //Todo: Validate
      _id: req.body.username,
      name: req.body.name,
      hash: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
      role: req.body.role,
    });
    console.log("Creating new user " + user);
    user.save((err) => {
      if (!err) {
        console.log("SUCCESS");
        res.status(201).json({
          //201: Created
          success: true,
          msg: "User created",
        });
      } else {
        console.log(err);
        if (err.code == 11000) {
          //Duplicate key
          res.status(400).json({
            success: false,
            msg: "User with the given ID already exists",
          });
        } else {
          res.status(500).json({
            success: false,
            msg: "Failed with error:" + err,
          });
        }
      }
    });
  } else {
    res
      .status(400)
      .json({ success: false, msg: "Missing or invalid parameters" });
  }
});

module.exports = router;
