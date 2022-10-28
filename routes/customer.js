const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/customer', customerController.getCustomerList);
router.get('/add-customer', customerController.addCustomer);

module.exports = router;