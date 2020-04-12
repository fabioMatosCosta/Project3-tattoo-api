const express = require('express');
const router = express.Router();
const Artist = require("../../models/Artists");
const session = require("express-session");
const multer = require('multer');
const TattooPic = require('../../models/TattooPics');
const uploadCloud = require('../../config/cloudinary.js');


router.post('/addTattoo', uploadCloud.single('photo'), (req, res, next) => {
    const { description, category } = req.body;
    const artist = req.session.currentArt._id;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newTattoo = new TattooPic({ description, category, imgPath, imgName, artist })
    newTattoo.save()
        .then(tattoo => {
            Artist
            .findByIdAndUpdate(req.session.currentArt._id, {
                $push: { tattoos: tattoo._id }
            },{useFindAndModify: false})
            .then(()=>{
                res.send("tattoo added");
            })
        })
        .catch(error => {
            console.log(error);
        })
});


module.exports = router;