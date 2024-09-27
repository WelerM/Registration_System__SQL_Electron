// models/visitor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Adjust the path accordingly

const Visitor = sequelize.define('Visitor', {
  id: { // Adding the primary key
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  visitor_id: {
    type: DataTypes.INTEGER,
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
  }
}, {
  tableName: 'visitors',
  timestamps: false
});

// Export the model
module.exports = Visitor;
