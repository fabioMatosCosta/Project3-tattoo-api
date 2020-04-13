const express = require('express');
const router = express.Router();
const TattooPic = require("../models/TattooPics");

router.get('/tattoos', (req, res, next) => {
    TattooPic
    .find()
    .populate("artist")
    .then((tattoo)=>{
        res.json(
            tattoo
        )
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router;