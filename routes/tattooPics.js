const express = require('express');
const router = express.Router();
const TattooPic = require("../models/TattooPics");

router.get('/', (req, res, next) => {
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

router.get('/tattoo-detail/:id', (req, res, next)=>{
    TattooPic
    .findById(req.params.id)
    .populate("artist")
    .then((tattoo)=>{
        res.json({
            _id: tattoo._id,
            category: tattoo.category,
            imgPath: tattoo.imgPath,
            artist: {
                _id: tattoo.artist._id,
                name: tattoo.artist.name
            }
        })
    })
})

module.exports = router;