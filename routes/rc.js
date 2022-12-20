const express = require('express');
const router = express.Router();

const controller = require('../controllers/rcController');

router.get('/rc-list', controller.getRCList);
router.get('/update-rc', controller.getUpRC);



module.exports = router;