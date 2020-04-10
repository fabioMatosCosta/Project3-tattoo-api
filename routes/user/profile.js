const express = require('express');
const router  = express.Router();
const User = require("../../models/Users");
const session    = require("express-session");

router.get('/profile', (req, res, next)=>{
    User
        .findById(req.session.currentUser._id)
        .then((user)=>{
            res.json({
                firstName: user.firstName,
                email: user.email
            })
        })
})


module.exports = router;