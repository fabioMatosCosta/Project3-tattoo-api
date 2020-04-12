const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tattooPicScehma = new Schema({
  image: String,
  category: String,
  desctription: String,
  imgName: String,
  imgPath: String,
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "artist" 
  }
},
{
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});


const TattooPic = mongoose.model("tattooPic",tattooPicScehma)

module.exports = TattooPic