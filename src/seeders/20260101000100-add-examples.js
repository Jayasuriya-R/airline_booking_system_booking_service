'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('Examples', [
      { name: 'First example', description: 'Seeded row', status: 'active', createdAt: now, updatedAt: now },
      { name: 'Second example', description: 'Seeded row', status: 'inactive', createdAt: now, updatedAt: now },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Examples', null, {});
  },
};
