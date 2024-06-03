const express = require('express');
const router = express.Router();
const kryptonianController = require('../controllers/kryptoniancontroller');

// Route for Kryptonian registration
router.post('/register', kryptonianController.register);

// Route for verifying email
router.get('/verify-email', kryptonianController.verifyEmail);

// Route for Kryptonian login
router.post('/login', kryptonianController.login);

// Route for generating OTP
router.get('/generate-otp', kryptonianController.generateOTP);

// Route for verifying OTP
router.post('/verify-otp', kryptonianController.verifyOTP);

module.exports = router;
