const path = require('path');
const fs = require('fs');

// Determine if we're running in Electron
let dbPath;

const folderPath = path.join(require('electron').app.getPath('documents'), 'registration_system_data');

// Check if the folder exists, and if not, create it
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true }); // The `recursive: true` option ensures that parent directories are created if needed
}

if (process.type === 'browser') {
  // Electron main process (packaged app)
  dbPath = path.join(folderPath, 'registration_system.sqlite');
} else {
  // Development mode (local development)
  dbPath = path.resolve(__dirname, '../database/registration_system.sqlite');
}

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'registration_system',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: dbPath
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
