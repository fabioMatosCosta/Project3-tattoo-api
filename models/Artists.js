const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
 
const artistScehma = new Schema({
  name: String,
  image: String,
  work: String,
  studio: String
});


const Artist = mongoose.model("artist",artistScehma)

module.exports = Artist