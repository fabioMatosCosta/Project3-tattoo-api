const express = require('express');
const router = express.Router();
const User = require("../../models/Users");
const session = require("express-session");
const multer = require('multer');
const Picture = require('../../models/picture');
const upload = multer({ dest: './public/uploads/' });
const uploadCloud = require('../../config/cloudinary.js');

router.get('/profile', (req, res, next) => {
    User
        .findById(req.session.currentUser._id)
        .then((user) => {
            res.json({
                firstName: user.firstName,
                email: user.email
            })
        })
    Picture.find((err, pictures) => {
        res.json('index', { pictures })
    })

});



router.post('/profile', uploadCloud.single('photo'), (req, res, next) => {
    const { title, description } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newphoto = new Picture({ title, description, imgPath, imgName })
    newphoto.save()
        .then(photo => {
            res.redirect('/');
        })
        .catch(error => {
            console.log(error);
        })
});
module.exports = router;