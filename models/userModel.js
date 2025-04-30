const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('users', {
  // Primary Key (Auto-incremented id)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Name of the user
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Email of the user
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  // Password of the user
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Phone number of the user
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // If phone is optional
  },

  // Timestamp fields (created_at, updated_at, deleted_at)
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
    allowNull: true, // This can be null if not deleted
  },
}, {
  // Enable timestamps (created_at, updated_at)
  timestamps: true,

  // Soft delete: setting paranoid true will automatically handle 'deletedAt'
  paranoid: true,
});

// Ensure that the table is created if it doesn't already exist
User.sync({ alter: true }).then(() => {
  console.log('User table has been created (or updated) if it didn\'t exist.');
});

module.exports = User;
