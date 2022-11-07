const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');

const _allowedDesignaiton = ['ADMIN'];

exports.customerMasterReport = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/report/customer-master.html`);
};

exports.businessReport = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/report/business.html`);
};

exports.potentialReport = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/report/potential.html`);
};

exports.rateWithProductReport = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/report/rates-with-products.html`);
};

exports.rcAgreementReport = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/report/rc-agreement.html`);
};

exports.dashboardReport = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/report/dashboard.html`);
};




