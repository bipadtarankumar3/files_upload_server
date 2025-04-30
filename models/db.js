require('dotenv').config();  // Make sure to load environment variables

const { Sequelize } = require('sequelize');

// Set up Sequelize with PostgreSQL using environment variables
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,  // Optional: set to true if you want to log SQL queries
});

// Test the database connection using async/await
const testConnection = async () => {
  try {
    await sequelize.authenticate();  // Authenticate the connection
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the test connection function
testConnection();

module.exports = sequelize;
