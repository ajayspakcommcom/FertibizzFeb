
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
const url = require('url');
const querystring = require('node:querystring');
const { constants } = require('buffer');
let _STATUSCODE = 200;
const _allowedDesignaiton = ['ADMIN'];


exports.getTestList = (req, res, next) => {    
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/test/index.html`);
    //res.write('<h1>Hello, World!</h1>');
};
