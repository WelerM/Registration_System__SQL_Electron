// seeds/xxxx-demo-visitor.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('visitors', [{
      name: 'weler',
      visitor_id: 40488380,
      visiting_floor: 3,
      visit_purpose: 'service',
      date: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('visitors', null, {});
  }
};
