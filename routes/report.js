const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');

router.get('/customer-master-report', reportController.customerMasterReport);
router.get('/business-report', reportController.businessReport);
router.get('/potential-report', reportController.potentialReport);
router.get('/rate-with-product-report', reportController.rateWithProductReport);
router.get('/rc-agreement-report', reportController.rcAgreementReport);
router.get('/dashboard-chart-report', reportController.dashboardChartReport);
router.get('/report', reportController.dataReport);
router.post('/report/potential', reportController.getPotentialData);
router.post('/report/RCAgreement', reportController.getRateContractData);
router.post('/report/businessReport', reportController.getBusinessReport);
router.post('/report/allbusinessReports', reportController.getAllBusinessReport);



module.exports = router;