// src/seeders/20260320175723-emplyee-user.js
'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('func123', 10);

    await queryInterface.bulkInsert('users', [{
      name:      'Funcionario Teste',
      email:     'funcionario@ponto.com',
      password:  hash,
      role:      'employee',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'funcionario@ponto.com' });
  },
};