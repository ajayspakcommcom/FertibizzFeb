const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');

const _allowedDesignaiton = ['ADMIN'];

exports.getSkuList = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/sku/list.html`);
};


exports.addSku = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/sku/add.html`);
};


