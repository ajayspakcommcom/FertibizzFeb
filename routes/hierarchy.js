const express = require('express');
const router = express.Router();
const controller = require('../controllers/hierarchyController');

router.use((req, res, next) => {
   // console.clear();
  //  console.log('Time: ', Date.now())
    next()
  })

// //   //listing

router.get('/employee-hierarchy/:id', controller.hierarchyPage);
router.get('/employee-hierarchy-details/:empId', controller.getEmployeeAndParentDetails);
router.get('/employee-hierarchy-mgr-list/:empId', controller.getManagerList);
router.post('/employee-hierarchy-mgr-update/', controller.updateManager);
// router.get('/employees/list', controller.getEmployeesList);


// // // // update
// router.get('/employee-edit/:id', controller.getEmployeeDetailsPage);

// router.get('/employee-details/:empId', controller.getEmployeeDetailsById);
// router.get('/employee-master', controller.getMasterData);
// router.post('/employee-update/:empId', controller.updateEmployee);


// // // // DELETE
// router.post('/employee-delete/:empId', controller.deleteEmployee);


// // // //ADD
// router.get('/employee-add/', controller.getEmployeeDetailsPage);
// router.post('/employee-add/', controller.addNewEmployee);



// // // //ADD
// router.get('/employee-add/', controller.getEmployeeDetailsPage);
// router.post('/employee-add/', controller.addNewEmployee);





module.exports = router;