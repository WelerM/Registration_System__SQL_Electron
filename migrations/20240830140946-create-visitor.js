// migrations/xxxx-create-visitor.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('visitors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      visitor_id: {
        type: Sequelize.INTEGER
      },
      visiting_floor: {
        type: Sequelize.INTEGER
      },
      visit_purpose: {
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('visitors');
  }
};
