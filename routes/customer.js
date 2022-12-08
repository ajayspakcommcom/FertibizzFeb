const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/customers', customerController.getCustomerList);
router.get('/add-customer', customerController.addCustomer);
router.post('/add-customer', customerController.addUpdateCustomer);

router.get('/add-customer-business', customerController.addCustomerBusiness);

router.post('/customer/list', customerController.getCustomerListData);
router.post('/customer/delete', customerController.deleteCustomerData);
router.get('/customer-edit/:customerId', customerController.getCustomerDetailsPage);
router.get('/customer-details/:customerId', customerController.getCustomerDetailsById);
router.get('/master-data', customerController.getMasterData);


router.get('/customer-contract-add/:chainAccountTypeId', customerController.getCustomerContractPage);
router.post('/rate-contract-add/', customerController.addContractRate);


module.exports = router;