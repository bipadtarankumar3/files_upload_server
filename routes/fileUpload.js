const express = require('express');
const router = express.Router();
const { uploadFile, upload } = require('../controllers/fileUploadController');

// Upload route
router.post('/', upload.single('file'), uploadFile);

module.exports = router;
