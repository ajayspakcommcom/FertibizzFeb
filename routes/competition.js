const express = require('express');
const router = express.Router();

const competitionController = require('../controllers/competitionController');

router.get('/add-competition', competitionController.addCompetition);
router.get('/competitor-sku-details/', competitionController.getCompetitionSkusListing);

router.post('/competitor-sku-add/', competitionController.addUpdateCompetitionSkus);
router.get('/competitor-sku-details/:', competitionController.addUpdateCompetitionSkus);
//router.get('/competitor-sku-details/:year/:centerId', competitionController.getCompetitionDetailsByCenterId);
router.get('/competitor-sku-details/:month/:year/:centerId', competitionController.getCompetitionDetailsByCenterId);
router.post('/center-competition-approved/', competitionController.approveCenterCompetition);

///center-competition-approved
module.exports = router;