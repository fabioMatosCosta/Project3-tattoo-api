const express = require('express');
const router = express.Router();
const User = require("../../models/Users");
const Picture = require('../../models/Picture');
const session = require("express-session");
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const uploadCloud = require('../../config/cloudinary');

router.get('/profile', (req, res, next) => {
    console.log(req.session.currentUser)
    User
        .findById(req.session.currentUser._id)
        .populate("image")
        .then((user) => {
            res.json({
                firstName: user.firstName,
                email: user.email,
                image: user.image
            })
        })
    .catch((err)=>{
        console.log("profile error:", err);
    })
});



router.post('/addPic', uploadCloud.single('photo'), (req, res, next) => {
    const { title, description } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newphoto = new Picture({ title, description, imgPath, imgName })
        newphoto.save()
        .then((photo) => {
            User
            .findByIdAndUpdate(req.session.currentUser._id, {
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