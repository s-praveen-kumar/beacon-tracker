const router = require("express").Router();
const { urlencoded } = require("express");
const User = require("../models/user");
const authHelper = require("../utils/authHelper");

router.get("/user", (req, res) => {
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
module.exports = router;