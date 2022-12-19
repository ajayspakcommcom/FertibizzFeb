const express = require('express');
const router = express.Router();

const controller = require('../controllers/notificationController');

router.get('/notification', controller.getNotificationList);

module.exports = router;