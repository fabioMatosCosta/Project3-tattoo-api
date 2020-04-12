const express = require('express');
const router = express.Router();
const Artist = require("../models/Artists");

router.get('/list', (req, res, next) => {
    Artist
    .find()
    .then((art)=>{
        res.json(
            art
        )
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router;