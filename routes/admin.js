const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.getAdmin);

 //router.post('/admin/dashboard', adminController.postApi);

 router.get('/dashboard', adminController.getDashboard);

router.post('/admin/api', adminController.postApi);

// router.get('/task-edit/:id', adminController.getTaskDetail);

// router.get('/task-create', adminController.getTaskCreate);

module.exports = router;