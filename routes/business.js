const express = require('express');
const router = express.Router();

const businessController = require('../controllers/businessController');

router.get('/add-business', businessController.addBusiness);

module.exports = router;