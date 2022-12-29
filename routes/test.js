const express = require('express');
const router = express.Router();

const controller = require('../controllers/testController');

router.get('/test', controller.getTestList);
module.exports = router;