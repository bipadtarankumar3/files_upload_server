const express = require('express');
const router = express.Router();
const { uploadFile, upload ,listFiles} = require('../controllers/fileUploadController');

// POST request for file upload with multer middleware
router.post('/', upload.single('file'), uploadFile);

// GET request for listing uploaded files
router.get('/list', listFiles);  // This route will return the list of uploaded files


module.exports = router;
