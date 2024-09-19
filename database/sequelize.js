// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/registration_system.sqlite',
  logging: false
});

module.exports = sequelize;
