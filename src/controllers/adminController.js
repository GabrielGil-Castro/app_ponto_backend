// src/controllers/adminController.js
const bcrypt          = require('bcryptjs');
const { User, PunchRecord } = require('../models');

async function listUsers(req, res) {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'role', 'createdAt'],
    order:      [['createdAt', 'DESC']],
  });

  return res.json(users);
}

async function createUser(req, res) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, email e senha sao obrigatorios.' });
  }

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    return res.status(409).json({ message: 'Email ja cadastrado.' });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role:     role || 'employee',
  });

  return res.status(201).json({
    id:    user.id,
    name:  user.name,
    email: user.email,
    role:  user.role,
  });
}

async function listRecords(req, res) {
  const records = await PunchRecord.findAll({
    order:   [['punchedAt', 'DESC']],
    limit:   50,
    include: [{
      model:      User,
      attributes: ['id', 'name', 'email'],
    }],
  });

  return res.json(records);
}

module.exports = { listUsers, createUser, listRecords };