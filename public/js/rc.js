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
                    <td><a href="/update-rc/?accountid=${list.aid}&custsomerid=${list.customerId}">Update</a></td>
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
            expiryDate: $('expiryDate').val(),
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