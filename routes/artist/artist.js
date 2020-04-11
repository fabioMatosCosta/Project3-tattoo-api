const express = require('express');
const router = express.Router();
const Artist = require("../../models/Artists");
const session = require("express-session");
const multer = require('multer');
const Picture = require('../../models/Picture');
// const upload = multer({ dest: './public/uploads/'});
const uploadCloud = require('../../config/cloudinary.js');

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

router.post('/addPic', uploadCloud.single('photo'), (req, res, next) => {
    const { title, description } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newphoto = new Picture({ title, description, imgPath, imgName })
    newphoto.save()
        .then(photo => {
            Artist.findById(req.session.currentUser._id)
        })
        // res.send('pic added');
        .catch(error => {
            console.log(error);
        })
});

module.exports = router;