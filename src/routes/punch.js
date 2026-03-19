const { Router } = require('express');
const { punch, myRecords }    = require('../controllers/punchController');
const { authenticate }        = require('../middlewares/auth');

const router = Router();

router.post('/',    authenticate, punch);
router.get('/my',   authenticate, myRecords);

module.exports = router;