const multer = require('multer');
const QRCode = require('qrcode');
const File = require('../models/fileModel');

// Multer file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  const { version } = req.body;
  const file = req.file;

  try {
    // Generate QR code for the file
    const qrCodeUrl = await QRCode.toDataURL(file.path);

    // Save file metadata to the database using Sequelize
    const uploadedFile = await File.create({
      filename: file.filename,
      version: version,
      downloadUrl: file.path,
      qrCode: qrCodeUrl,
    });

    // Return file information as a response
    res.status(201).json({
      id: uploadedFile.id,
      downloadUrl: file.path,
      qrCode: qrCodeUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

module.exports = {
  uploadFile,
  upload, // Export multer middleware for use in routes
};
