const express = require('express');
const router = express.Router();
const Artist = require("../../models/Artists");
const TattooPic = require('../../models/TattooPics');

router.get('/deleteTattoo/:id', (req, res, next)=>{
    const tattooId = req.params.id;
    Artist
    .findByIdAndUpdate(req.session.currentArt._id, {
        $pull: { tattoos: tattooId }
    })
    .then(()=>{
        TattooPic
        .findByIdAndDelete(tattooId,{useFindAndModify: false})
        .then(()=>{
            res.send("tattoo deleted");
        })
    })
})

module.exports = router;