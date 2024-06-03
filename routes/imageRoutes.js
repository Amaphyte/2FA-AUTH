const express = require('express');
const multer = require('multer');
const path = require('path');
const imageController = require('../controllers/imagecontroller');

const upload = multer({ dest: 'uploads/' }); // Configure upload destination

const router = express.Router();

router.post('/upload', upload.single('image'), imageController.uploadImage);

router.get('/images/:filename', imageController.getImage);

module.exports = router;
