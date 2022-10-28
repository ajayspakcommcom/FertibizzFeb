const express = require('express');
const router = express.Router();

const competitionController = require('../controllers/competitionController');

router.get('/add-competition', competitionController.addCompetition);

module.exports = router;