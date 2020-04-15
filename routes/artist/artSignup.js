const express = require('express');
const router  = express.Router();
const Artist = require('../../models/Artists');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {
    const { email, passWord ,name, work, studio } = req.body;
    Artist.findOne({ "email": email })
    .then((art) => {
        if (art !== null) {
            res.status(403).json({
                message: "The email already exists!"
            })
        }else {
        bcrypt.hash(passWord, bcryptSalt, function (err, hash) {
            if (err) {
                console.log(err)
                next("Hashing error", err)
            }else {
            Artist.create({
                email: email,
                passWord: hash,
                name: name,
                work: work,
                studio: studio,
                image: "5e9318eaf0d8ac19e218177d"
            })
        .then((art)=>{
            res.json({
                message: `Hey, ${art.name}, you can login now.`
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