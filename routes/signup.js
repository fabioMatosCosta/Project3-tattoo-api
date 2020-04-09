const express = require('express');
const router  = express.Router();
const Users = require('../models/Users');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {
    const { email, passWord ,firstName } = req.body;
    Users.findOne({ "email": email })
    .then((user) => {
        if (user !== null) {
        next("The email already exists!");
        }else {
        bcrypt.hash(passWord, bcryptSalt, function (err, hash) {
            if (err) next("Hashing error", err)
            else {
            Users.create({
                email: email,
                passWord: hash,
                firstName: firstName,
            })
        .then((user)=>{
            res.json({
                email: user.email,
                firstName: user.firstName
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    });
    }}
)})

module.exports = router;