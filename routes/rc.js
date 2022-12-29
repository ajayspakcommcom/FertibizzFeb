const express = require('express');
const router = express.Router();

const controller = require('../controllers/rcController');


router.get('/rc-list', controller.getRCList);
router.post('/rc-list', controller.getRCListData);
router.get('/update-rc/:custsomerId', controller.getUpRC);
router.get('/update-rc', controller.getUpRC);
router.post('/update-rc/', controller.createRC);

module.exports = router;