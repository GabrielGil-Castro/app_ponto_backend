'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface) {
    const hash = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('users', [{
      name: 'Administrador',
      email: 'admin@ponto.com',
      password: hash,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkInsert('users', { email: 'admin@ponto.com' })
  }
}