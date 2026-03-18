// src/controllers/punchController.js
const { PunchRecord } = require('../models');

async function punch(req, res) {
  const record = await PunchRecord.create({
    userId:    req.user.id,
    punchedAt: new Date(),
  });

  return res.status(201).json(record);
}

async function myRecords(req, res) {
  const records = await PunchRecord.findAll({
    where:   { userId: req.user.id },
    order:   [['punchedAt', 'DESC']],
    limit:   20,
  });

  return res.json(records);
}

module.exports = { punch, myRecords };