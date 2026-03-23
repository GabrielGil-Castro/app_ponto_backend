const { Router } = require('express');
const { listUsers, createUser, listRecords, deleteUser, deleteRecord } = require('../controllers/adminController');
const { authenticate, authorizeAdmin }       = require('../middlewares/auth');

const router = Router();

router.use(authenticate, authorizeAdmin);

router.get('/users',    listUsers);
router.post('/users',   createUser);
router.get('/records',  listRecords);
router.delete('/users/:id', deleteUser);
router.delete('/records/:id', deleteRecord);

module.exports = router;