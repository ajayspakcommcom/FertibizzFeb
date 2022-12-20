const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;
const _allowedDesignaiton = ['ADMIN'];

exports.getRCList = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/rc/index.html`);
};

exports.getUpRC = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/rc/add.html`);
};

