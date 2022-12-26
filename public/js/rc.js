function setupPage() {
    console.log('fetch center')

    let myKamId = parseInt(getIdFromURL()),
        userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
        param = {
            parentId: userData.empId,
        };
    axios
        .post(`/rc-list`, param).then((response) => {
            console.log(response.data);
            //   populateDataTable(response.data);
            let lists = response.data,
                listArr = [];
            lists.forEach(list => {
                listArr.push(
                    ` <tr>
                    <td>${formatText(list.accountName)}</td>
                    <td>${formatText(list.CENTRENAME)}</td>
                    <td>${formatText(list.DoctorName)}</td>
                    <td>${formatText(list.RateContractStatus)}</td>
                    <td><a href="/update-rc/?customerAccountId=${list.aid}&customerid=${list.customerId}&CatAccountId=${list.CatAccountId}"> ${(list.CatAccountId > 0)? `Update` : `Add` }</a>
                    ${(list.SKUDetails === 0 && list.CatAccountId>0) ? `| <a href='/customer-contract-add/${list.CatAccountId}'>Add SKU Price list</a>`: ``}
                    ${(list.SKUDetails > 0 && list.CatAccountId>0) ? `| <a href='/customer-contract-add/${list.CatAccountId}'>Update SKU Price list</a>`: ``}
                    
                    </td>
                </tr>
                `)
            });
            $('#centerList').append(listArr.join(''))

        }).catch((err) => {
            console.log(err);
        });
}

function validateMe() {
    console.log(`here`)
    console.log($('#fileName'));
    let config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
        param = {
            parentId: parseInt(userData.empId),
            myKamId : parseInt(getQueryStringValue('custsomerid')),
            accountId : parseInt(getQueryStringValue('accountid')),
            expiryDate: $('#expiryDate').val(),
            files: $('#fileName')

        };
        //encType="multipart/form-data"
    axios
        .post(`/update-rc/`, param, config).then((response) => {
            console.log(response.data);

        }).catch((err) => {
            console.log(err);
        });

}

function setupRCdetails() {
    
    let myKamId = parseInt(getIdFromURL()),
    userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
    param = {
        parentId: userData.empId,
    };
axios
    .get(`/account-chain-details/${getQueryStringValue('CatAccountId')}`).then((response) => {
        console.log(response.data);
        let data = response.data[0];
        if(data) {
            $('#lblcontractFile').html(`<br><a href="${_ROOT}/img/rcfiles/${data.contractDoc}" target="_blank">Click here to view the contract</a>`);
            $('#expiryDate').val(moment.utc(data.expiryDate).format('D-MMM-yy'))
            console.log(moment.utc(data.expiryDate).format('D-MMM-yy'));
            $('#hidfileName').val(data.contractDoc);
            
            
        }

    }).catch((err) => {
        console.log(err);
    });
}