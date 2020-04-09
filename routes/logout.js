const express = require('express');
const router  = express.Router();
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

router.post('/logout', (req, res, next) => {
    req.session.destroy()
    res.json({message:"Have fun,see you later,stay true"})
});

module.exports = router;
