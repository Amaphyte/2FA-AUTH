// Example using Express and Multer (for file uploads)

const express = require('express');
const multer = require('multer');
const Path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' }); // Configure upload destination

const imageController = express.Router();

imageController.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { filename, mimetype, size } = req.file;
    
    res.status(201).json({ message: 'Image uploaded successfully!', filename, mimetype, size });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


imageController.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'public', 'images', filename); // Adjust path based on your setup
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).json({ message: 'Image not found' });
    } else {
      res.status(200).contentType('image/*'); // Set appropriate content type
    }
  });
});


module.exports = imageController;