// models/visit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Adjust the path accordingly
const Visitor = require('./visitor'); // Import Visitor model to set up the foreign key

const Visit = sequelize.define('Visit', {
  id: { // Adding the primary key
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
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
    defaultValue: () => {
      // Get the current date and time in local (PT-BR) timezone
      const localDate = new Date();
      
      // Adjust for Brazilian time zone (UTC-3 for standard time)
      const brazilTimeOffset = -3; // Set offset for PT-BR timezone

      // Create a new date object to avoid mutating the original
      const adjustedDate = new Date(localDate.getTime() + (brazilTimeOffset * 60 * 60 * 1000));
        console.log(adjustedDate);
        
      return adjustedDate;
    },
    allowNull: false
  }
}, {
  tableName: 'visits',
  timestamps: false
});

// Export the model
module.exports = Visit;
