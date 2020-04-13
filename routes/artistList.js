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

router.get('/artist-detail/:id', (req, res, next)=>{
    Artist
    .findById(req.params.id)
    .populate("image")
    .populate("tattoos")
    .then((art)=>{
        res.json({
            name: art.name,
            work: art.work,
            studio: art.studio,
            image: art.image.imgPath,
            tattoos: art.tattoos
        })
    })
})

module.exports = router;