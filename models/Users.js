const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
 
const userSchema = new Schema({
  userName: String,
  passWord: String,
  email: String,
  firstName: String
});


const User = mongoose.model("user",userSchema)

module.exports = User