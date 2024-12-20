const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config/config.js'); // Use the config we set up

// Get the path to the SQLite file from the config
const dbPath = config.development.storage; // Adjust to use production if needed

// Check if the SQLite file exists, and create it if it doesn't
if (!fs.existsSync(dbPath)) {
  console.log(`⚠️  Database file does not exist at ${dbPath}. Creating it...`);
  fs.writeFileSync(dbPath, ''); // Optional: Create an empty file
}

// Create Sequelize instance using development configuration
const sequelize = new Sequelize(config.development);

// Sync the database to create missing tables if necessary
(async () => {
  try {
    await sequelize.sync();
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing the database:', error);
  }
})();

module.exports = sequelize;
