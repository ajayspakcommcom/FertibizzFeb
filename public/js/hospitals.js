function getCustomerList() {

    let param = {
        method: 'getHospitalList'
    };

    axios
        .get(_URL._CUSTOMER_LIST, param).then((response) => {
            console.log(response.data)
            populateDataTable(response.data);

        }).catch((err) => {
            console.log(err);
        });
}


function populateDataTable(data) {
    //  console.log("populating data table...");
    // clear the table before populating it with more data
    $("#customerList").DataTable().clear();
    var length = data.length;
    //  console.log(length)
    if (length == 0) {
        $("#customerList").DataTable().clear();
    } else {
        console.log(data);
        var i = 1;
        data.forEach(item => {
            $('#customerList').dataTable().fnAddData([
                '<input type="checkbox" value="">',
                item.CENTRENAME,
                item.DoctorName,
                item.specialtyType,
                item.mobile,
                item.email,
                `${item.Address1} <br> 
                    ${item.Address2}<br> 
                    ${item.LocalArea}<br> 
                    ${item.City} ${item.PinCode} <br> ${item.stateName} `,
                item.ChemistMapped,
                item.ChainStatusName,
                `<a href="/customer-edit/${item.customerId}">Edit</a> | <a href='javascript:void(0)' onclick='DeleteCustomer(${item.customerId},"${item.CENTRENAME}");return false;' class='${item.customerId}' title='${item.CENTRENAME}'>Delete</a>`
            ]);
        });
    }
}


function getCustomerDetails() {
    getMasterData();
    if (!isEditPage()) {
        return;
    }


    let urlArr = window.location.href.split('/'),
        customerId = urlArr[urlArr.length - 1];
    console.log(customerId);
    axios
        .get('/customer-details/' + customerId).then((response) => {
            console.log(response.data)
            let customerData = response.data;
            $('#txtCode').val(customerData.code)
            $('#txtDoctorName').val(customerData.DoctorName)
           
            $('#txtDoctorUniqueCode').val(customerData.DoctorUniqueCode),
                $('#txtMobile').val(customerData.mobile)
            $('#txtEmail').val(customerData.email)
            $('#txtCenterName').val(customerData.CENTRENAME)
            $('#txtAddress1').val(customerData.Address1)
            $('#txtAddress2').val(customerData.Address2)
            $('#txtLocalArea').val(customerData.LocalArea)
            $('#txtCity').val(customerData.City)
            $('#txtPinCode').val(customerData.PinCode)
            $('#txtChemistMapped').val(customerData.ChemistMapped)

            $('#txtStateId').val(customerData.StateID)
            $('#txtChainId').val(customerData.chainID)

            $('#hidSpecialty').val(customerData.SpecialtyId)
            $('#hidVisitCategory').val(customerData.visitId)
            

            $('#chkDisabled').prop('checked', customerData.isdisabled);

            setTimeout(cmbValues,5000);
            // $('#txtVisitCategory').val()
            // $('#txtSpecialty').val()
            // $('#cmbChain').val()
            // $('#cmbState').val(customerData.StateID);
            
            
            //$('#chkDisabled').is(":checked")
        }).catch((err) => {
            console.log(err);
        });

        $('h1').text('Edit Customer');
}



function cmbValues() {
    $("#cmbState").val($('#txtStateId').val());
    $("#cmbChain").val($('#txtChainId').val())

    $("#cmbSpecialty").val($('#hidSpecialty').val())
    $("#cmbVisitCategory").val($('#hidVisitCategory').val())

}

function DeleteCustomer(id, name, bulkDelete) {

    let param = {
        hospitalId: id
    };

    if (!bulkDelete) {
        let text = `Are you sure you want to delete "${name}"`; // "Are you sure you want to delete '+  +'!\nEither OK or Cancel.";
        if (confirm(text) == true) {
            // let param = {
            //     hospitalId: id
            // };
            //  console.log(param)
            axios
                .post("/customer/delete", param).then((response) => {
                    //console.log(response.data)
                    alert(response.data.msg)

                }).catch((err) => {
                    console.log(err);
                });
        } else {
            text = "You canceled!";
        }
    } else {

        axios
        .post("/customer/delete", param).then((response) => {
            console.log(response.data.msg)
        }).catch((err) => {
            console.log(err);
        });

    }
}

function getQueryStringValue(key) {
    console.log(window.location)
    let urlSearchParams = new URLSearchParams(window.location.search);
    console.log(urlSearchParams)
    return urlSearchParams.get(key);


}

function validateMe() {
    let urlArr = window.location.href.split('/'),
        hospitalId = urlArr[urlArr.length - 1];

    console.log(hospitalId);
    let param = {
        hospitalName: $('#txtHospitalName').val(),
        hospitalregion: $('#txtRegionName').val(),
        isDisabled: $('#chkIsDisable').val()
    },
        URL = isEditPage() ? _URL._HOSPITAL_UPDATE + hospitalId : _URL._HOSPITAL_ADD

    axios
        .post(URL, param).then((response) => {
            console.log(response.data[0])
            let res = response.data[0];
            if (res.sucess === 'true') {
                redirect(_URL._hospitalListing);
            } else {
                $('#lblMsg').text(res.msg);
            }


        }).catch((err) => {
            console.log(err);
        });

}


function submitMe() {
    let urlArr = window.location.href.split('/'),
        customerId = urlArr[urlArr.length - 1];

    let param = {
        txtCode: $('#txtCode').val(),
        txtDoctorName: $('#txtDoctorName').val(),
        txtVisitCategory: $('#cmbVisitCategory').val(),
        txtSpecialty: $('#cmbSpecialty').val(),
        txtDoctorUniqueCode: $('#txtDoctorUniqueCode').val(),
        txtMobile: $('#txtMobile').val(),
        txtEmail: $('#txtEmail').val(),
        txtCenterName: $('#txtCenterName').val(),
        txtAddress1: $('#txtAddress1').val(),
        txtAddress2: $('#txtAddress2').val(),
        txtLocalArea: $('#txtLocalArea').val(),
        txtCity: $('#txtCity').val(),
        txtPinCode: $('#txtPinCode').val(),
        cmbChain: $('#cmbChain').val(),
        txtPinCode: $('#txtPinCode').val(),
        txtChemistMapped: $('#txtChemistMapped').val(),
        cmbState: parseInt($('#cmbState').val()),
        chkDisabled: $('#chkDisabled').is(":checked"),
        customerId: isNaN(customerId) ? null : parseInt(customerId)
    }

    console.log(param)
    axios
        .post(_URL._CUSTOMER_ADD, param).then((response) => {
            console.log(response.data[0])
            let res = response.data[0];
            if (res.sucess === 'true') {
                redirect('/customers');
            } else {
                $('#lblMsg').text(res.msg);
            }
        }).catch((err) => {
            console.log(err);
        });
}


function getMasterData() {
    axios
        .get(`${_URL._MASTER_DATA}`).then((response) => {
             console.log(response.data)
            let stateList = response.data[0],
                chainList = response.data[1],
                visitTypeList = response.data[2],
                specialtyList = response.data[3];
            loadComboBox(stateList, 'cmbState', 'stateId', 'stateName');
            loadComboBox(chainList, 'cmbChain', 'chainId', 'Name');
            loadComboBox(visitTypeList, 'cmbVisitCategory', 'VisitID', 'Name');
            loadComboBox(specialtyList, 'cmbSpecialty', 'SpecialtyID', 'Name');

        }).catch((err) => {
            console.log(err);
        });
}

function selectCustomerRow() {
    let table = $('#customerList').DataTable();

    $('#customerList tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');

        // console.log($(this));
        // console.log($(this)[0].classList[1]);
        if($(this)[0].classList[1] == 'selected') {
            $(this).find('input[type="checkbox"]').attr('checked', true);
        } else {
            $(this).find('input[type="checkbox"]').attr('checked', false);
        }
    });
}

function bulkCustomerDataDelete() {
    let table = $('#customerList').DataTable();
    $.map(table.rows('.selected').data(), function (item, index) {
        let elem = $($(`#customerList tbody tr:eq(${index})`)[0]).find(`td > a:last-child`);
        DeleteCustomer(elem[0].className, elem[0].title, true);
    });
    table.rows('.selected').remove().draw(false);
}