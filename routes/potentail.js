const express = require('express');
const router = express.Router();

const potentialController = require('../controllers/potentialController');

router.get('/add-potential', potentialController.addPotential);

module.exports = router;