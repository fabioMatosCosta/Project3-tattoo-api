const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  passWord: {type:String,
    validate: {
      validator: function (v) {
          return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v);
      },
      message: props => `${props.value}is not a valid password.8 chars at least one uppercase one lowercase`
  }},
  email: String,
  firstName: String,
  image: {
    type: mongoose.Types.ObjectId,
    ref: "pictures" 
  }
});


const User = mongoose.model("user",userSchema)

module.exports = User