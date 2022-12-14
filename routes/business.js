const express = require('express');
const router = express.Router();

const controller = require('../controllers/businessController');

router.get('/add-business', controller.addBusiness);
router.get('/sku-details/', controller.getSKUDetails);
router.post('/sku-add/', controller.addUpdateBusinessTracker);
router.post('/business-tracker-details/', controller.getBusinessTrackerDetails);
router.post('/center-business-tracker-approved/', controller.approveCenterBusinessTracker);






module.exports = router;