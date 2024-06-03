const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const kryptonianSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    unique: true
  },
  verified: {
    type: Boolean,
    default: false,
  },
 
}, { timestamps: true });


const Kryptonian = mongoose.model('Kryptonian', kryptonianSchema);

module.exports = Kryptonian;
