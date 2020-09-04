const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String
  },
  img: {
    type: String
  },
  usedByChristian: {
    type: Boolean,
    default: false
  },
  usedByAndrea: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
})