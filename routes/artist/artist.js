const express = require('express');
const router = express.Router();
const Artist = require("../../models/Artists");
const session = require("express-session");
const multer = require('multer');
const Picture = require('../../models/Picture');
const uploadCloud = require('../../config/cloudinary.js');



router.get('/profile', (req, res, next) => {
    Artist
        .findById(req.session.currentArt._id)
        .populate("image")
        .populate("tattoos")
        .then((art) => {
            res.json({
                firstName: art.name,
                work: art.work,
                studio: art.studio,
                email: art.email,
                image: art.image,
                tattoos: art.tattoos
            })
        })
});



router.post('/addPic', uploadCloud.single('photo'), (req, res, next) => {
    const { title, description } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newphoto = new Picture({ title, description, imgPath, imgName })
    newphoto.save()
        .then(photo => {
            Artist
            .findByIdAndUpdate(req.session.currentArt._id, {
                image: photo._id 
            },{new: true, useFindAndModify: false})
            .populate("image")
            .then(()=>{
                res.send("pic updated");
            })
        })
        .catch(error => {
            console.log(error);
        })
});


module.exports = router;