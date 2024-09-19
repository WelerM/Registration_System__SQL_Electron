// models/visit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Adjust the path accordingly
const Visitor = require('./visitor'); // Import Visitor model to set up the foreign key

const Visit = sequelize.define('Visit', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Visitor, // This references the 'visitors' table
      key: 'id'
    },
    onDelete: 'CASCADE', // Optional: defines what happens when a referenced visitor is deleted
  },
  visiting_floor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      len: [1, 1], // Ensures it's exactly 1 character in length
    }
  },
  visit_purpose: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'visits',
  timestamps: false
});

module.exports = Visit;
