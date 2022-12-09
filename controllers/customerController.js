const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;

const _allowedDesignaiton = ['ADMIN'];

exports.getCustomerList = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/customer/list.html`);
};

exports.getRCList = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/contract/rc-list.html`);
};

exports.addCustomerBusiness = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/customer/add-business.html`);
};

exports.AddChainAccountData = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/contract/add-ac.html`);
};


exports.addUpdateAchainAccountData = (req, res, next) => {
    // console.log('inside update employee');
     let params = Object.assign(req.params, req.body);
     addUpdateAchainAccountData(params).then(result => {
         res.status(_STATUSCODE).json(result)
     })
 };

 function addUpdateAchainAccountData( objParam ) {
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
                    .input("accountID", sql.Int, objParam.accountID || null)
                    .input("name", sql.NVarChar, (objParam.txtChainName))
                    .input("isDisabled", sql.Bit, (objParam.chkDisabled))
                    .execute("USP_ADD_UPDATE_CHAIN_ACCOUNT")
                    .then(function (resp) {
                        resolve(resp.recordset);
                        // let json = { success: true, msg: 'Chain Account deleted successfully' };
                        // resolve(json);
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

exports.getChainAccountDetailsById = (req, res, next) => {
    console.log(req.params, '--->')
    getChainAccountDetailsById(req.params).then((result) => {
         res.status(_STATUSCODE).json(result);
     });
 };
 
 
 getChainAccountDetailsById = (objParam) => {
     return new Promise((resolve) => {
         var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
         dbConn
             .connect()
             .then(function () {
                 var request = new sql.Request(dbConn);
                 request
                     .input("accountId", sql.Int, objParam.accountId)
                     .execute("USP_GET_CHAIN_ACCOUNT_DETAILS_BY_ID")
                     .then(function (resp) {
                        console.log(resp)
                         resolve(resp.recordset);
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


exports.getChailAccountData = (req, res, next) => {
    // console.log('inside getSKUListData employee');
      let params = Object.assign(req.params, req.body);
      getChailAccountData(params).then(result => {
          res.status(_STATUSCODE).json(result)
      })
  };
 
 
  getChailAccountData = (objParam) => {
     //console.log('I am Here', objParam);
     return new Promise((resolve) => {
         var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
         dbConn
             .connect()
             .then(function () {
                 var request = new sql.Request(dbConn);
                 request
                     .execute("USP_GET_CHAIN_ACCOUNT_LIST")
                     .then(function (resp) {
                        //  console.log(resp)
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

 exports.DeleteChainAccountData = (req, res, next) => {
    DeleteChainAccountData(req.params).then(result => {
        res.status(_STATUSCODE).json(result)
    })
};


DeleteChainAccountData = (objParam) => {
    // console.log('I am Here', objParam);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("accountId", sql.Int, objParam.accountId)
                    .execute("USP_DELETE_CHAIN_ACCOUNT")
                    .then(function (resp) {
                        let json = { success: true, msg: 'Chain Account deleted successfully' };
                        resolve(json);
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


exports.getCustomerListData = (req, res, next) => {
   // console.log('inside getCustomerListData employee');
     let params = Object.assign(req.params, req.body);
     getCustomerListData(params).then(result => {
         res.status(_STATUSCODE).json(result)
     })
 };

 getCustomerListData = (objParam) => {
    //console.log('I am Here', objParam);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("empId", sql.Int, objParam.empId)    
                    .execute("USP_GET_CUSTSOMER_LIST")
                    .then(function (resp) {
                       //  console.log(resp)
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



exports.addCustomer = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/customer/add.html`);
};


exports.addUpdateCustomer = (req, res, next) => {
    // console.log('inside update employee');
     let params = Object.assign(req.params, req.body);
     addUpdateCustomer(params).then(result => {
         res.status(_STATUSCODE).json(result)
     })
 };



function addUpdateCustomer( objParam ) {
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
                    .input("customerId", sql.Int, objParam.customerId || null)
                    .input("code", sql.NVarChar, objParam.txtCode)
                    .input("DoctorName", sql.NVarChar, objParam.txtDoctorName)
                    .input("visitId", sql.Int, (objParam.txtVisitCategory))
                    .input("SpecialtyID", sql.Int, (objParam.txtSpecialty))
                    .input("DoctorUniqueCode", sql.NVarChar, objParam.txtDoctorUniqueCode)
                    .input("mobile", sql.NVarChar, objParam.txtMobile)
                    .input("email", sql.NVarChar, objParam.txtEmail)
                    .input("CENTRENAME", sql.NVarChar, objParam.txtCenterName)
                    .input("Address1", sql.NVarChar, (objParam.txtAddress1))
                    .input("Address2", sql.NVarChar, objParam.txtAddress2)
                    .input("LocalArea", sql.NVarChar, objParam.txtLocalArea)
                    .input("City", sql.NVarChar, objParam.txtCity)
                    .input("StateID", sql.Int, objParam.cmbState)
                    .input("PinCode", sql.NVarChar, (objParam.txtPinCode))
                    .input("ChemistMapped", sql.NVarChar, (objParam.txtChemistMapped))
                    .input("isDisabled", sql.Bit, (objParam.chkDisabled))
                    .input("chainID", sql.NVarChar, (objParam.cmbChain))
                    .input("chainAccountTypeId", sql.Int, (objParam.chainAccountTypeId))
                    
                    .execute("USP_ADD_UPDATE_CUSTSOMER")
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




exports.deleteCustomerData = (req, res, next) => {
    deleteCustomerData(req.body).then(result => {
        res.status(_STATUSCODE).json(result)
    })
};


deleteCustomerData = (objParam) => {
    // console.log('I am Here', objParam);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("customerId", sql.Int, objParam.hospitalId)
                    .execute("USP_DELETE_CUSTSOMER")
                    .then(function (resp) {
                        let json = { success: true, msg: 'customer deleted successfully' };
                        resolve(json);
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


exports.getCustomerDetailsPage = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/customer/add.html`);
};

exports.getCustomerDetailsById = (req, res, next) => {
   // console.log(req.params, '--->')
    getCustomerDetailsById(req.params).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};


getCustomerDetailsById = (objParam) => {
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("customerId", sql.Int, objParam.customerId)
                    .execute("USP_GET_CUSTSOMER_DETAILS_BY_ID")
                    .then(function (resp) {
                    //    console.log(resp)
                        resolve(resp.recordset[0]);
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


//




/************* MASTER MODULE *************/
exports.getMasterData = (req, res, next) => {
    getCustomerMasterData(req.params).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};


getCustomerMasterData = (objParam) => {
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .execute("USP_BSV_GET_MASTER_DATA")
                    .then(function (resp) {
                       // console.log('****** fetching the data ******')
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
/************* MASTER MODULE *************/


exports.getCustomerContractPage = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/contract/add.html`);
};





exports.addContractRate = (req, res, next) => {
    addContractRate(req.body).then(result => {
        res.status(_STATUSCODE).json(result)
    })
};


addContractRate = (objParam) => {
    // console.log('I am Here', objParam);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("chainAccountTypeId", sql.Int, objParam.chainAccountTypeId)
                    .input("brandId", sql.Int, objParam.brandId)
                    .input("brandGroupId", sql.Int, objParam.brandGroupID)
                    .input("medId", sql.Int, objParam.skuId)
                    .input("price", sql.Float, objParam.rate)
                    .execute("USP_INSERT_CUSTOMER_CONTRACTRATE")
                    .then(function (resp) {
                        let json = { success: true, msg: 'rate contract added successfully' };
                        resolve(json);
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



exports.getContractDetailsById = (req, res, next) => {
    // console.log(req.params, '--->')
     getContractDetailsById(req.params).then((result) => {
         res.status(_STATUSCODE).json(result);
     });
 };
 
 
 getContractDetailsById = (objParam) => {
     return new Promise((resolve) => {
         var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
         dbConn
             .connect()
             .then(function () {
                 var request = new sql.Request(dbConn);
                 request
                     .input("chainAccountTypeId", sql.Int, objParam.chainAccountTypeId)
                     .execute("USP_GET_CONTRACT_DETAILS")
                     .then(function (resp) {
                     //    console.log(resp)
                         resolve(resp.recordset);
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