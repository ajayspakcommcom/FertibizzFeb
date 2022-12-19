const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;
const _allowedDesignaiton = ['ADMIN'];

exports.getNotificationList = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/notification/index.html`);
};

