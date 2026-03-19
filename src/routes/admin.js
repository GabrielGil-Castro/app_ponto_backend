const { Router } = require('express');
const { listUsers, createUser, listRecords } = require('../controllers/adminController');
const { authenticate, authorizeAdmin }       = require('../middlewares/auth');

const router = Router();

router.use(authenticate, authorizeAdmin);

router.get('/users',    listUsers);
router.post('/users',   createUser);
router.get('/records',  listRecords);

module.exports = router;