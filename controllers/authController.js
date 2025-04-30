const jwt = require('jsonwebtoken');
const pool = require('../models/db');

// Authenticate the user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Check user credentials in the database
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0 && result.rows[0].password === password) {
      // Generate JWT Token
      const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginUser,
};
