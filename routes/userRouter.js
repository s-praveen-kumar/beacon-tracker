const router = require("express").Router();
const User = require("../models/user");
const authHelper = require("../utils/authHelper");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

router.get("/get", (req, res) => {
    if (!authHelper.requireLogin(req, res))
    return;
    User.findOne({ _id: req.body.authData.username }, (err, user) => {
        if (err) {
            res.status(500).json({ success: false, msg: err });
        } else {
            if (user)
                res.json({ success: true, username: user._id, role: user.role, name: user.name });
            else
                res.json({ success: false, msg: "User not found" });
        }
    });
});


router.post("/create", (req, res) => {
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