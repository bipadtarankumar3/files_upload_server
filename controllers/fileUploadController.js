const multer = require('multer');
const path = require('path');
const QRCode = require('qrcode');
const pool = require('../models/db');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// File upload handler
const uploadFile = async (req, res) => {
  const { version } = req.body;
  const file = req.file;

  // Generate QR code URL for the uploaded file
  const qrCodeUrl = await QRCode.toDataURL(file.path);

  // Save file info into the database
  try {
    const result = await pool.query(
      'INSERT INTO uploads (filename, version, download_url, qr_code) VALUES ($1, $2, $3, $4) RETURNING *',
      [file.filename, version, file.path, qrCodeUrl]
    );
    res.status(201).json({
      id: result.rows[0].id,
      downloadUrl: file.path,
      qrCode: qrCodeUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'File upload failed' });
  }
};

module.exports = {
  uploadFile,
  upload,  // Exporting multer middleware for file upload
};
