const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const profilePicture = new Schema({
  title: String,
  description: String,
  imgName: String,
  imgPath: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

var Picture = mongoose.model("pictures", profilePicture);

module.exports = Picture;