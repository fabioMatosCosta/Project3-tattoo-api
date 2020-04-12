const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const artistScehma = new Schema({
  name: String,
  passWord: String,
  email: String,
  work: String,
  studio: String,
  image:{
    type: mongoose.Types.ObjectId,
    ref: "pictures" 
  },
  tattoos:[{
    type: mongoose.Types.ObjectId,
    ref: "tattooPic" 
  }]
});


const Artist = mongoose.model("artist",artistScehma)

module.exports = Artist