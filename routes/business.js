const express = require('express');
const router = express.Router();

const controller = require('../controllers/businessController');

router.get('/add-business', controller.addBusiness);
router.get('/sku-details/', controller.getSKUDetails);



module.exports = router;