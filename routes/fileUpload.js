const express = require('express');
const router = express.Router();
const { uploadFile, upload } = require('../controllers/fileUploadController');

// POST request for file upload with multer middleware
router.post('/', upload.single('file'), uploadFile);

module.exports = router;
