const multer = require('multer');
const QRCode = require('qrcode');
const File = require('../models/fileModel');
const path = require('path'); // To use path.extname()

// Multer file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Saving the file in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Creating a unique filename based on the current time and file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  const { version } = req.body;
  const file = req.file;

  try {
    

    // Construct the full download URL for the file
    const downloadUrl = `http://localhost:5000/uploads/${file.filename}`;

    // Generate QR code for the file path
    const qrCodeUrl = await QRCode.toDataURL(downloadUrl);

    // Save file metadata to the database using Sequelize
    const uploadedFile = await File.create({
      filename: file.filename,
      version: version,
      downloadUrl: downloadUrl,  // Full URL to the file
      qrCode: qrCodeUrl,         // QR code as a base64-encoded string
    });

    // Send back the response with the file info
    res.status(201).json({
      id: uploadedFile.id,
      downloadUrl: downloadUrl,
      qrCode: qrCodeUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

// Controller to get the list of uploaded files
const listFiles = async (req, res) => {
  try {
    // Fetch all files from the database
    const files = await File.findAll();

    res.status(200).json({
      success: true,
      data: files.map((file) => ({
        id: file.id,
        filename: file.filename,
        version: file.version,
        downloadUrl: file.downloadUrl, // Full URL to the file
        qrCode: file.qrCode,           // QR code URL or data URI
        createdAt: file.createdAt,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to fetch files' });
  }
};

module.exports = {
  uploadFile,
  upload, // Export the multer upload middleware for use in routes
  listFiles,
};
