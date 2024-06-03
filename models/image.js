const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
 
}, { timestamps: true });


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
