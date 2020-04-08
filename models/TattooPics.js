const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
 
const tattooPicScehma = new Schema({
  image: String,
  category: String,
  desctription: String,
  artist: String
});


const TattooPic = mongoose.model("tattooPic",tattooPicScehma)

module.exports = TattooPic