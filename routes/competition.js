const express = require('express');
const router = express.Router();

const competitionController = require('../controllers/competitionController');

router.get('/add-competition', competitionController.addCompetition);
router.get('/competitor-sku-details/', competitionController.getCompetitionSkusListing);
router.post('/competitor-sku-add/', competitionController.addUpdateCompetitionSkus);



module.exports = router;