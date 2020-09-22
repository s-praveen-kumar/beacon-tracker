const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authHelper = require("../utils/authHelper");

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


module.exports = router;
