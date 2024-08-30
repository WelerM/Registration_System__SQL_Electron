// models/visitor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Adjust the path accordingly

const Visitor = sequelize.define('Visitor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  visitor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  visiting_floor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  visit_purpose: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'visitors',
  timestamps: false
});

module.exports = Visitor;
