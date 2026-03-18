const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PunchRecord = sequelize.define('PunchRecord', {
  id: {
    type:          DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:    true,
  },
  userId: {
    type:      DataTypes.INTEGER,
    allowNull: false,
  },
  punchedAt: {
    type:         DataTypes.DATE,
    allowNull:    false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName:  'punch_records',
  timestamps: false,
});

module.exports = PunchRecord;