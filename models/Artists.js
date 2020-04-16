const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistScehma = new Schema({
  name: String,
  passWord: {type:String,
    validate: {
      validator: function (v) {
          return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v);
      },
      message: props => `${props.value}is not a valid password.8 chars at least one uppercase one lowercase`
  }},
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
  }],
  
});


const Artist = mongoose.model("artist",artistScehma)

module.exports = Artist