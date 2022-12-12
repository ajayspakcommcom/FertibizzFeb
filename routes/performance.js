const express = require('express');
const router = express.Router();

const controller = require('../controllers/Performance');

router.get('/view-performance/:customerId', controller.getPerformace);

module.exports = router;