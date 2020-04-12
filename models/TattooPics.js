const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tattooPicScehma = new Schema({
  image: String,
  category: String,
  desctription: String,
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "artist" 
  }
});


const TattooPic = mongoose.model("tattooPic",tattooPicScehma)

module.exports = TattooPic