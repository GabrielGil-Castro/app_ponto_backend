// src/models/index.js
const sequelize   = require('../config/database');
const User        = require('./User');
const PunchRecord = require('./PunchRecord');

// associações
User.hasMany(PunchRecord, { foreignKey: 'userId' });
PunchRecord.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, PunchRecord };