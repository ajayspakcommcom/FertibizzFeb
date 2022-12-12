const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;
const _allowedDesignaiton = ['ADMIN'];

exports.getPerformace = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/performance/list.html`);
};