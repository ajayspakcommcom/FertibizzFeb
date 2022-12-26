
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
const url = require('url');
const querystring = require('node:querystring');
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

function getRCListData( objParam ) {
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
    var body = req.body;
    // console.log(body);
    // const absPath = path.join(__dirname); // <-- absolute path
    // console.log("Absolute Path: ", absPath);

    let myuploadedFile = req.files.fileName;
        sampleFile = myuploadedFile.name;
        myFileName = sampleFile.split('.').join('_' + Date.now() + '.');
        uploadPath = '/public/img/rcfiles/';
        console.log(__dirname + 'img/rcfiles'+myFileName);
        //console.log(myuploadedFile.mv())
        myuploadedFile.mv('public/img/rcfiles/'+myFileName, function(err) {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            res.send('File uploaded!');
        });
    // createRC1(req).then((result) => {
    //     res.status(_STATUSCODE).json(result);
    // });
};

function createRC1(req) {
   // console.clear();
    console.log('--------------------------------')
    const queryObject = url.parse(req.url, true).query;
    // console.log(req.files)
    // console.log(req.url)
    // console.log(queryObject.accountid)
    // console.log(queryObject.custsomerid)
    //console.log(path.join(__dirname, "public"));
    
    console.log('--------------------------------')
   

    return 'file uploaded successfully';

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
