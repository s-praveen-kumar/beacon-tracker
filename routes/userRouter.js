const router = require("express").Router();
const { urlencoded } = require("express");
const User = require("../models/user");

router.get("/user", (req, res) => {
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