const crypto = require('crypto');

const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const getApiKey = async (req, res) => {
  try {
    const user = req.user; // Assuming user object from authentication middleware

    if (user.apiKey) {
      return res.status(200).json({ apiKey: user.apiKey });
    }

    const apiKey = generateApiKey();
    user.apiKey = apiKey;
    await user.save();

    res.status(200).json({ apiKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
