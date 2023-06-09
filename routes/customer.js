const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/customers', customerController.getCustomerList);
router.get('/contracts', customerController.getRCList);

router.get('/add-customer', customerController.addCustomer);
router.post('/add-customer', customerController.addUpdateCustomer);
router.get('/add-chain-account', customerController.AddChainAccountData);

router.post('/accound-chain-add', customerController.addUpdateAchainAccountData);

router.get('/account-chain-edit/:accountId', customerController.AddChainAccountData);
router.get('/account-chain-details/:accountId', customerController.getChainAccountDetailsById);

router.post('/account-chain-edit/:accountId', customerController.addUpdateAchainAccountData);

router.get('/account-chain-list', customerController.getChailAccountData);

router.post('/account-chain/delete/:accountId', customerController.DeleteChainAccountData);

router.get('/add-customer-business', customerController.addCustomerBusiness);

router.post('/customer/list', customerController.getCustomerListData);
router.post('/customer/delete', customerController.deleteCustomerData);
router.get('/customer-edit/:customerId', customerController.getCustomerDetailsPage);
router.get('/customer-details/:customerId', customerController.getCustomerDetailsById);
router.get('/master-data', customerController.getMasterData);

router.get('/customer-contract-add/:chainAccountTypeId', customerController.getCustomerContractPage);
router.post('/rate-contract-add/', customerController.addContractRate);

router.get('/contract-details/:chainAccountTypeId', customerController.getContractDetailsById);

router.post('/customer-master-data-approved/', customerController.approveCenterMasterData);



module.exports = router;