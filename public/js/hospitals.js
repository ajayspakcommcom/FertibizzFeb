function getHospitalList() {

    let param = {
        method: 'getHospitalList'
    };
 
    axios
        .get("/hospitals/list", param).then((response) => {

            populateDataTable(response.data);

        }).catch((err) => {
            console.log(err);
        });
}


function populateDataTable(data) {
    //  console.log("populating data table...");
    // clear the table before populating it with more data
    $("#hospitalList").DataTable().clear();
    var length = data.length;
    //  console.log(length)
    if (length == 0) {
        $("#hospitalList").DataTable().clear();
    } else {
        var i = 1;
        data.forEach(item => {
            $('#hospitalList').dataTable().fnAddData([
                i,
                item.hospitalName,
                item.regionName,
                item.bedNo,
                item.ICUbedNo,
                `<a href="/hospitals-edit/${item.hospitalId}">Edit</a> | <a href='javascript:void(0)' onclick='DeleteHospital(${item.hospitalId},"${item.hospitalName}");return false;'>Delete</a>`
            ]);
            i++;
        });
    }
}


function getHospitaDetails() {
    if (!isEditPage() ) {
        return ;
    }
    let urlArr = window.location.href.split('/'),
        hospitalId = urlArr[urlArr.length - 1];

    console.log(hospitalId);

    let param = {
        method: 'getHospitalById',
        hospitalId: hospitalId
    };

    axios
        .get('/hospitals-details/'+hospitalId).then((response) => {
           console.log(response.data)
           let hospitalData = response.data[0];
           console.log(hospitalData.hospitalName);
           $('#txtHospitalName').val(hospitalData.hospitalName);
           $('#txtRegionName').val(hospitalData.regionName);
           $("#chkIsDisable").prop("checked", hospitalData.isDisabled);


        }).catch((err) => {
            console.log(err);
        });
}


function DeleteHospital(id, name) {
    let text = `Are you sure you want to delete "${name}"`; // "Are you sure you want to delete '+  +'!\nEither OK or Cancel.";
    if (confirm(text) == true) {
        let param = {
            method: 'deleteHospital',
            hospitalId: id
        };
        //  console.log(param)
        axios
            .post("/hospitals/delete", param).then((response) => {
                //console.log(response.data)
                alert(response.data.msg)

            }).catch((err) => {
                console.log(err);
            });
    } else {
        text = "You canceled!";
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
        hospitalName : $('#txtHospitalName').val(),
        hospitalregion : $('#txtRegionName').val(),
        isDisabled : $('#chkIsDisable').val()
    },
    URL =  isEditPage()? _URL._HOSPITAL_UPDATE+hospitalId: _URL._HOSPITAL_ADD
    
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