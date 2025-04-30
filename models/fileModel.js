const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Assuming `User` is another model that you want to reference for `created_by`
const User = require('./userModel'); // Import your User model here, for the reference

const File = sequelize.define('files', {
  // Primary Key (Auto-incremented file_id)
  file_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Filename of the uploaded file
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Version of the uploaded file
  version: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Download URL of the uploaded file
  downloadUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // QR Code for the file download link
  qrCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // User who created the file (Foreign Key)
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: User,    // Reference the User model
      key: 'id',      // Reference the 'id' field from the User model
    },
    allowNull: false,
  },

  // Timestamps (created_at, updated_at, and deleted_at)
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  // Enable timestamps (created_at, updated_at)
  timestamps: true,

  // Soft delete: setting paranoid true will automatically handle 'deletedAt'
  paranoid: true,
});

// Ensure that the table is created if it doesn't already exist
File.sync({ alter: true }).then(() => {
  console.log('File table has been created (or updated) if it didn\'t exist.');
});

module.exports = File;
