const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController')

router.use((req, res, next) => {
   // console.clear();
  //  console.log('Time: ', Date.now())
    next()
  })

  //listing
router.get('/hospitals', hospitalController.listHospitals);
router.get('/hospitals/list', hospitalController.getHospitalList);

// update
router.get('/hospitals-edit/:id', hospitalController.getHospitalDetailsPage);
router.get('/hospitals-details/:hospitalId', hospitalController.getHospitalDetailsById);
router.post('/hospitals-update/:hospitalId', hospitalController.updateHospitals);


// DELETE
router.post('/hospitals/delete', hospitalController.deleteHospitals);


//ADD
router.get('/hospitals-add/', hospitalController.getHospitalDetailsPage);
router.post('/hospitals-add/', hospitalController.addNewHospital);

module.exports = router;