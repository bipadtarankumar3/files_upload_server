const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

// Login route
router.post('/', loginUser);

module.exports = router;
