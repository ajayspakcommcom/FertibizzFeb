const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;


const _allowedDesignaiton = ['ADMIN'];

exports.addCompetition = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/competition/add.html`);
};





exports.getCompetitionSkusListing = (req, res, next) => {
    // console.log('inside update employee');
     let params = Object.assign(req.params, req.body);
     getCompetitionSkusListing(params).then(result => {
         res.status(_STATUSCODE).json(result)
     })
 };

function getCompetitionSkusListing( objParam ) {
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
                    .execute("usp_list_competitor_SKUs")
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


//



exports.addUpdateCompetitionSkus = (req, res, next) => {
    // console.log('inside update employee');
     let params = Object.assign(req.params, req.body);
     addUpdateCompetitionSkus(params).then(result => {
         res.status(_STATUSCODE).json(result)
     })
 };

 

function addUpdateCompetitionSkus( objParam ) {
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
                    .input("empId", sql.Int, objParam.empId)
                    .input("centerId", sql.Int, parseInt(objParam.centerId))
                    .input("brandId", sql.Int, objParam.brandId)
                    .input("skuId", sql.Int, objParam.skuId)
                    .input("year", sql.NVarChar, objParam.year)
                    .input("april", sql.Float, objParam.apr)
                    .input("may", sql.Float, objParam.may)
                    .input("jun", sql.Float, objParam.jun)
                    .input("jul", sql.Float, objParam.jul)
                    .input("aug", sql.Float, objParam.aug)
                    .input("sep", sql.Float, objParam.sep)
                    .input("oct", sql.Float, objParam.oct)
                    .input("nov", sql.Float, objParam.nov)
                    .input("dec", sql.Float, objParam.dec)
                    .input("jan", sql.Float, objParam.jan)
                    .input("feb", sql.Float, objParam.feb)
                    .input("mar", sql.Float, objParam.mar)
                    
                    .execute("USP_ADD_UPDATE_SKU_COMPETITION")
                    .then(function (resp) {
                        console.log(resp.recordset)
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
