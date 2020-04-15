const express = require('express');
const router  = express.Router();
const Artist = require("../../models/Artists");
const bcrypt = require("bcrypt");
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


router.post("/login",(req, res, next) => {
    const {email, passWord} = req.body;
    Artist.findOne({
        email
    })
    .populate("image")
    .populate("tattoos")
    .then((art)=>{
    if(!art) { 
        res.status(403).json({message: "invalid credentials!"})
    }else {
        bcrypt.compare(passWord,art.passWord, function(err,correctPassWord){
        if(err) next("hash compare error");
        else if(!correctPassWord) {
            res.status(403).json({
            message: "invalid credentials!"
            })
        }else {
            req.session.currentArt = art;
            res.status(200).json({
                name: art.name,
                email: art.email,
                image: art.image,
                tattoos: art.tattoos
            })
        }
        })
    }
    })
    .catch((err)=> {
    res.send("Error, not logged in.")
})
});


module.exports = router;