// src/server.js
require('dotenv').config();
const express       = require('express');
const cors          = require('cors');
const { sequelize } = require('./models');

const authRoutes  = require('./routes/auth');
const punchRoutes = require('./routes/punch');
const adminRoutes = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// rotas
app.use('/auth',  authRoutes);
app.use('/punch', punchRoutes);
app.use('/admin', adminRoutes);

// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// sincroniza banco e sobe servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco sincronizado.');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err.message);
    process.exit(1);
  });