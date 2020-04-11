const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.json({name: "Fábio"});
});

router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newMovie = new Movie({title, description, imgPath, imgName})
  newMovie.save()
  .then(movie => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});
module.exports = router;
