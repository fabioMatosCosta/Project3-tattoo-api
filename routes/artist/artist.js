const express = require('express');
const router = express.Router();
const Artist = require("../../models/Artists");

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

router.post("/newArtist", (req, res, next) => {
    const { name, work } = req.body;
    Artist.create({
        name: name,
        work: work
    })
    .then((art) => {
        return res.json({
            message: `Hey, ${art.name} is added to the database.`
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router;