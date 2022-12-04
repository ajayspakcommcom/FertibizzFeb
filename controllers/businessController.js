const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;

const _allowedDesignaiton = ['ADMIN'];

exports.addBusiness = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/business/add.html`);
};






exports.getSKUDetails = (req, res, next) => {
    // console.log('inside update employee');
     let params = Object.assign(req.params, req.body);
     getSKUDetails(params).then(result => {
         res.status(_STATUSCODE).json(result)
     })
 };

function getSKUDetails( objParam ) {
    // console.log('--------------------------------')
    // console.log(objParam)
    // console.log('--------------------------------')
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .execute("USP_GET_ALL_SKU_BUSINESS_TRACKER")
                    .then(function (resp) {
                        //console.log(resp.recordset)
                        resolve(resp.recordset);
                        dbConn.close();
                    })
                    .catch(function (err) {
                        console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                console.log(err);
            });
    });
};