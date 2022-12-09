const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;
const _allowedDesignaiton = ['ADMIN'];

exports.getAccountMappingPage = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/account-mapping/index.html`);
};

exports.getAccountMappingPotentialList = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/account-mapping/potential-list.html`);
};

exports.getAccountMappingPotentialDetail = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/account-mapping/view-potential.html`);
};