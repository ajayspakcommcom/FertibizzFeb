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



exports.getPotentialData = (req, res, next) => {
   // console.log('i am here');
    getPotentialData(req.body).then((result) => {
        res.status(200).json(result);
    });
};



getPotentialData = (objParam) => {
    //console.log('I am Here', objParam);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("hospitalId", sql.Int, null)
                    .input("empId", sql.Int, null)
                    .input("startDate", sql.Int, null)
                    .input("endDate", sql.Int, null)
                    .execute("USP_BSVIVF_GET_POTENTIALS")
                    .then(function (resp) {
                       // console.log('***********')
                        // console.log(resp)
                        resolve(resp.recordset);
                        dbConn.close();
                    })
                    .catch(function (err) {
                       // console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                console.log(err);
            });
    });
};



exports.getRateContractData = (req, res, next) => {
    // console.log('i am here');
     getRateContractData(req.body).then((result) => {
         res.status(200).json(result);
     });
 };
 
 
 
 getRateContractData = (objParam) => {
     //console.log('I am Here', objParam);
     return new Promise((resolve) => {
         var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
         dbConn
             .connect()
             .then(function () {
                 var request = new sql.Request(dbConn);
                 request
                     .input("hospitalId", sql.Int, null)
                     .input("empId", sql.Int, 999)
                     .input("startDate", sql.Int, null)
                     .input("endDate", sql.Int, null)
                     .execute("USP_BSVIVF_REPORT_GET_RCAgreement")
                     .then(function (resp) {
                        // console.log('***********')
                         // console.log(resp)
                         resolve(resp.recordset);
                         dbConn.close();
                     })
                     .catch(function (err) {
                        // console.log(err);
                         dbConn.close();
                     });
             })
             .catch(function (err) {
                 console.log(err);
             });
     });
 };
