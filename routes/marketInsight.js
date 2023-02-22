const express = require('express');
const router = express.Router();

const controller = require('../controllers/marketInsightController');

// router.get('/sku', controller.getSkuList);
// router.get('/add-sku', controller.addSku);
// router.get('/sku/master-data/', controller.getMasterData);

// router.post('/add-sku', controller.addUpdateSku);

// router.get('/sku-list', controller.getSKUListData);

// router.post('/sku/delete/:skuId', controller.deleteSkuData);

// router.get('/sku-edit/:skuId', controller.addSku);

router.get('/market-insight-add', controller.addMarketInsight);
router.post('/center-market-insight-add', controller.addCenterMarketInsight);
router.get('/market-insight-detail/:insightId', controller.getCenterMarketInsightById);
router.post('/center-market-insight-approved', controller.approveCenterMarketInsightByInsightId);

// router.post('/sku-edit/:skuId', controller.addUpdateSku);

module.exports = router;