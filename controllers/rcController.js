
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
const url = require('url');
const querystring = require('node:querystring');
const { constants } = require('buffer');
let _STATUSCODE = 200;
const _allowedDesignaiton = ['ADMIN'];


exports.getRCList = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/rc/index.html`);
};

exports.getUpRC = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/rc/add.html`);
};



exports.getRCListData = (req, res, next) => {
    getRCListData(req.body).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};

function getRCListData(objParam) {
    // console.log('****************************')
    // console.log(objParam)
    // console.log('****************************')
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("parentId", sql.Int, objParam.parentId)
                    .execute("USP_GET_CENTERLIST_FOR_RBM_V1")
                    .then(function (resp) {
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




exports.createRC = (req, res, next) => {
    console.clear();
    console.log('RC Executed');
    let fileName = req.body.hidfileName;
    if (!req.files || Object.keys(req.files).length === 0) {

    } else {
        let myuploadedFile = req.files.fileName;
        sampleFile = myuploadedFile.name;
        fileName = sampleFile.split('.').join('_' + Date.now() + '.');
        myuploadedFile.mv('public/img/rcfiles/' + fileName, function (err) {
            if (err) {
                //   console.log(err)
                return res.status(500).send(err);
            }
        });
    }


    createRC1(fileName, req).then((result) => {

        //  res.redirect('/customer-contract-add/'+result[0].outCome);
        res.redirect('/rc-list')
    });
};

function createRC1(filename, req) {
    // console.clear();
    console.log('--------------------------------')
    const queryObject = url.parse(req.url, true).query;
    // console.log(filename)
    console.log('RC Object',req.body);
     console.log(req.body.expiryDate);
    // console.log(req.body.hidRbmId);
    // console.log(queryObject.customerAccountId)
    // console.log(queryObject.CatAccountId)
    // //console.log(queryObject.custsomerid)
     console.log('--------------------------------')

    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("contractDoc", sql.NVarChar, filename)
                    .input("expiryDate", sql.Date, req.body.expiryDate)
                    .input("CustomerAccountId", sql.Int, queryObject.customerAccountId)
                    .input("rbmId", sql.Int, req.body.hidRbmId)
                    .input("accountId", sql.Int, queryObject.CatAccountId)
                    .execute("USP_CREATE_RBM_RATE_CONTRACT")
                    .then(function (resp) {
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
