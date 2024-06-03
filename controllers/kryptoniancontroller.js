const bycrpt = require('bcrypt');
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const Kryptonian = require('../models/kryptonian');


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingKryptonian = await Kryptonian.findOne({ email });
    if (existingKryptonian) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newKryptonian = new Kryptonian({
      name,
      email,
      password: hashedPassword
    });

    await newKryptonian.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
    
        const kryptonian = await Kryptonian.findOne({ verificationToken: token });
        if (!kryptonian) {
          return res.status(400).json({ message: 'Invalid verification token' });
        }
        kryptonian.verified = true;
        kryptonian.verificationToken = undefined; 
        await kryptonian.save();

        return res.status(200).json({ message: 'Email verified successfully'});
     } catch {
        console.error(error)
     }
};
 
          
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const kryptonian = await Kryptonian.findOne({ email });
    if (!kryptonian) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const passwordMatch = await bcrypt.compare(password, kryptonian.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: kryptonian._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.generateOTP = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret();
    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.ascii,
      label: 'YourApp',
      issuer: 'YourApp'
    });

    
    const qrCode = await QRCode.toDataURL(otpAuthUrl);
    res.status(200).json({ secret: secret.ascii, qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { token, secret } = req.body;
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2,
    });

    if (verified) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(401).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


