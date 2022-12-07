const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController')

router.use((req, res, next) => {
   // console.clear();
  //  console.log('Time: ', Date.now())
    next()
  })

// //   //listing

router.get('/employees', controller.listingPage);
router.get('/employees/list', controller.getEmployeesList);


router.get('/employees/kam-list', controller.getkamList);
router.get('/employees/centre-list/:empId', controller.getCentreList);

router.post('/employees/kamlist', controller.getKamListData);

// // // update
router.get('/employee-edit/:id', controller.getEmployeeDetailsPage);

router.get('/employee-details/:empId', controller.getEmployeeDetailsById);
router.get('/employee-master', controller.getMasterData);
router.post('/employee-update/:empId', controller.updateEmployee);


// // // DELETE
router.post('/employee-delete/:empId', controller.deleteEmployee);


// // //ADD
router.get('/employee-add/', controller.getEmployeeDetailsPage);
router.post('/employee-add/', controller.addNewEmployee);



// // //ADD
router.get('/employee-add/', controller.getEmployeeDetailsPage);
router.post('/employee-add/', controller.addNewEmployee);



//employee hospital list
router.get('/employee-hospital/:empId', controller.getAssingedHospitalPage);
router.get('/employee-hospital-list/:empId', controller.getAssingedHospitaList);
router.post('/employee-hospital-edit/:empId/:hospitalId', controller.removeHospitalFromEmployeeList);

router.get('/employee-hospital-new/:empId', controller.getAssignNewHospitalToEmployeePage);
router.get('/employee-hospital-un-assigned', controller.getUnAssingedHospitals);
router.post('/employee-hospital-un-assigned-update', controller.updateUnAssingedHosptalstoEmployee);


//router.post('/employee-add/', controller.addNewEmployee);


module.exports = router;