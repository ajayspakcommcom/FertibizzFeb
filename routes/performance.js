const express = require('express');
const router = express.Router();

const controller = require('../controllers/Performance');

router.get('/view-performance/:customerId', controller.getPerformace);
router.get('/view-performanceData/:centerId', controller.getPerformaceData);

module.exports = router;