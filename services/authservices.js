const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Redis = require('../config/redis');
const Kryptonian = require('../models/kryptonian');
const { generateOtp } = require('../utils/otp');

class AuthService {
  async login(email, password) {
    const user = await Kryptonian.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials');
    }
    const otp = generateOtp();
    await Redis.set(`otp_${email}`, otp, 'EX', 300); // Store OTP for 5 minutes
    return otp;
  }

  async verifyOtp(email, otp) {
    const storedOtp = await Redis.get(`otp_${email}`);
    if (storedOtp !== otp) {
      throw new Error('Invalid OTP');
    }
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

module.exports = new AuthService();
