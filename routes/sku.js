const express = require('express');
const router = express.Router();

const skuController = require('../controllers/skuController');

router.get('/sku', skuController.getSkuList);
router.get('/add-sku', skuController.addSku);

module.exports = router;