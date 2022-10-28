const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');

const _allowedDesignaiton = ['ADMIN'];

exports.getCustomerList = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/customer/list.html`);
};


exports.addCustomer = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/customer/add.html`);
};


