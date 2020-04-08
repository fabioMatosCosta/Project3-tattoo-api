const express = require('express');
const router  = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


  router.post("/login",(req, res, next) => {
    const {userName, passWord} = req.body;
    User.findOne({
      userName
    })
    .then((user)=>{
      if(!user) next("Invalid Credentials")
      else {
        bcrypt.compare(passWord,user.passWord, function(err,correctPassword){
          if(err) next("hash compare error");
          else if(!correctPassWord) res.send("invalid credentials")
          else {
            req.session.currentUser = user;
            res.redirect("profile")
          }
        })
      }
    })
    .catch((err)=> {
      res.send("Error, not logged in.")
  })
});


  module.exports = router;