require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const fileUploadRoutes = require('./routes/fileUpload');

// Use Routes
app.use('/login', authRoutes);
app.use('/upload', fileUploadRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
