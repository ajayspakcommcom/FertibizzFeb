const express = require('express');
const router = express.Router();

const controller = require('../controllers/accountMapping');

// router.get('/sku', controller.getSkuList);
// router.post('/add-sku', controller.addUpdateSku);

router.get('/account-mapping/:empID', controller.getAccountMappingPage);
router.get('/account-mapping/potential/:empID', controller.getAccountMappingPotentialDetail);

router.get('/account-mapping/:empId/potential-list', controller.getAccountMappingPotentialList);
router.post('/account-mapping/:empId/potential-list', controller.getAccountMappingPotentialListData);



module.exports = router;