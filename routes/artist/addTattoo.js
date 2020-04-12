const express = require('express');
const router = express.Router();
const Artist = require("../../models/Artists");
const session = require("express-session");
const multer = require('multer');
const TattooPic = require('../../models/TattooPics');
const uploadCloud = require('../../config/cloudinary.js');


router.post('/addTattoo', uploadCloud.single('photo'), (req, res, next) => {
    const { title, description, category } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newTattoo = new TattooPic({ title, description, category, imgPath, imgName })
    newTattoo.save()
        .then(tattoo => {
            Artist
            .findByIdAndUpdate(req.session.currentArt._id, {
                $push: { tattoos: tattoo._id }
            }),{new: true}
            .populate("tattoos")
            .then(()=>{
                res.send("tattoo added");
            })
        })
        .catch(error => {
            console.log(error);
        })
});


module.exports = router;