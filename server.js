const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const fileUploadRoutes = require('./routes/fileUpload');
const sequelize = require('./models/db');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/login', authRoutes);
app.use('/upload', fileUploadRoutes);

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.log('Error syncing with the database:', err);
  });

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
