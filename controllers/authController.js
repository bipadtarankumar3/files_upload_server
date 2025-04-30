const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email using Sequelize's `findOne` method
    const user = await User.findOne({ where: { email } });
    
    if (user && user.password === password) {
      // If valid, generate a JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
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
