const express = require('express');
const router = express.Router();

const controller = require('../controllers/accountMapping');

// router.get('/sku', controller.getSkuList);
// router.post('/add-sku', controller.addUpdateSku);

router.get('/account-mapping', controller.getAccountMappingPage);
router.get('/account-mapping/potentials/:empID', controller.getAccountMappingPotentialList);
router.get('/account-mapping/potential/:empID', controller.getAccountMappingPotentialDetail);


module.exports = router;