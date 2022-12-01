const express = require('express');
const router = express.Router();

const controller = require('../controllers/potentialController');

router.get('/potential-add', controller.addPotential);
router.post('/center-potentials-add', controller.addCenterPotential);
router.post('/center-potentials-details', controller.getCenterPotentialDetails);





module.exports = router;