const express = require('express');
const router  = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


  router.post("/login",(req, res, next) => {
    const {email, passWord} = req.body;
    User.findOne({
      email
    })
    .populate("image")
    .then((user)=>{
      if(!user) { 
        res.status(403).json({message: "invalid credentials!"})
      }else {
        bcrypt.compare(passWord,user.passWord, function(err,correctPassWord){
          if(err) next("hash compare error");
          else if(!correctPassWord) {
            res.status(403).json({
              message: "invalid credentials!"
              })
          }else {
            req.session.currentUser = user;
            res.status(200).json({
                firstName: user.firstName,
                email: user.email,
                image: user.image
              })
          }
        })
      }
    })
    .catch((err)=> {
      res.send("Error, not logged in.", err)
  })
});


  module.exports = router;