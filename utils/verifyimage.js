function verifyImage(file) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedMimeTypes.includes(file.mimetype);
  }
  
  module.exports = { verifyImage };
  