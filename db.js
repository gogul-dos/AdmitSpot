// db.js
const { Sequelize } = require("sequelize");

// Replace with your actual database configuration
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql", // or 'postgres', 'sqlite', etc., based on your setup
});

module.exports = sequelize;
