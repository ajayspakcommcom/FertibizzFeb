const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
const { Console } = require('console');
let _STATUSCODE = 200;

exports.hierarchyPage = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/employees/hierarchy.html`);
};


exports.getEmployeeAndParentDetails = (req, res, next) => {
    // console.log(req.params)
    getEmployeeDetailsById(req.params).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};


getEmployeeDetailsById = (objParam) => {
    // console.log('here i am '+ objParam.empId)
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("empId", sql.Int, objParam.empId)
                    .execute("USP_BSVHR_GET_EMPLOYEE_AND_MANAGER")
                    .then(function (resp) {
                        //console.log(resp)
                        resolve(resp.recordsets);
                        dbConn.close();
                    })
                    .catch(function (err) {
                        //console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                //console.log(err);
            });
    });
};

exports.getManagerList = (req, res, next) => {
    // console.log(req.params)
    getManagerList(req.params).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};

getManagerList = (objParam) => {
    // console.log('here i am '+ objParam.empId)
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("empId", sql.Int, objParam.empId)
                    .execute("USP_BSVHR_GET_MANAGER_LIST")
                    .then(function (resp) {
                        //console.log(resp)
                        resolve(resp.recordset);
                        dbConn.close();
                    })
                    .catch(function (err) {
                        //console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                //console.log(err);
            });
    });
};




exports.updateManager = (req, res, next) => {
    // console.log(req.body)
    updateManager(req.body).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};

updateManager = (objParam) => {
    //console.log('here i am '+ objParam.empId)
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("empId", sql.Int, objParam.empId)
                    .input("parentId", sql.Int, objParam.parentId)
                    .execute("USP_BSVHR_UPDATE_MANAGER")
                    .then(function (resp) {
                        //console.log(resp)
                        resolve(resp.recordset);
                        dbConn.close();
                    })
                    .catch(function (err) {
                        //console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                //console.log(err);
            });
    });
};
