const express = require('express');
const router  = express.Router();
const Users = require('../models/Users');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {
    const { userName, passWord , email ,firstName } = req.body;
    Users.findOne({ "userName": userName })
    .then((user) => {
        if (user !== null) {
        next("The username already exists!");
        }else {
        bcrypt.hash(passWord, bcryptSalt, function (err, hash) {
            if (err) next("Hashing error", err)
            else {
            Users.create({
                userName: userName,
                passWord: hash,
                email: email,
                firstName: firstName,
            })
        .then((user)=>{
            res.json({
                userName: user.userName,
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