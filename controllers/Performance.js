const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;
const _allowedDesignaiton = ['ADMIN'];

exports.getPerformace = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/performance/list.html`);
};

exports.getPerformaceData = (req, res, next) => {
    // console.log(req.params, '--->')
    getPerformaceData(req.params).then((result) => {
         res.status(_STATUSCODE).json(result);
     });
 };

 exports.getPerformaceData1 = (req, res, next) => {
    // console.log(req.params, '--->')
    getPerformaceData1(req.params).then((result) => {
         res.status(_STATUSCODE).json(result);
     });
 };
 
 
 getPerformaceData = (objParam) => {
     return new Promise((resolve) => {
         var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
         dbConn
             .connect()
             .then(function () {
                 var request = new sql.Request(dbConn);
                 request
                     .input("centerId", sql.Int, objParam.centerId)
                     .execute("USP_GET_VIEW_PERFORMANCE_FOR_CENTER")
                     .then(function (resp) {
                        console.log(resp)
                         resolve(resp.recordsets);
                         dbConn.close();
                     })
                     .catch(function (err) {
                       //  console.log(err);
                         dbConn.close();
                     });
             })
             .catch(function (err) {
                 //console.log(err);
             });
     });
 };

 getPerformaceData1 = (objParam) => {
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("centerId", sql.Int, objParam.centerId)
                    .input("month", sql.Int, objParam.month)
                    .input("year", sql.Int, objParam.year)
                    .execute("USP_GET_VIEW_PERFORMANCE_FOR_CENTER_v1")
                    .then(function (resp) {
                       console.log(resp)
                        resolve(resp.recordsets);
                        dbConn.close();
                    })
                    .catch(function (err) {
                      //  console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                //console.log(err);
            });
    });
};
