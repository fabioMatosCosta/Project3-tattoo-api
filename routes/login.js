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
    .then((user)=>{
      if(!user) { 
        res.json({message: "The email doesn't exist!"})
      }else {
        bcrypt.compare(passWord,user.passWord, function(err,correctPassWord){
          if(err) next("hash compare error");
          else if(!correctPassWord) {
            res.json({
              message: "invalid credentials!"
              })
          }else {
            req.session.currentUser = user;
            res.json({
                firstName: user.firstName,
                email: user.email
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