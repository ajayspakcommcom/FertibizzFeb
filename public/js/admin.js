function letMeLogin() {

    let param = {
        method: 'adminLogin',
        username: $('#txtUsername').val(),
        password: $('#txtPassword').val()
    };
    console.log(param)
    axios
        .post("/admin/api", param).then((response) => {
            console.log(response);
            switch (checkIfValidStatus(response.status)) {
                case 1:
                    localStorage.setItem("BSV_IVF_Admin_Data", JSON.stringify(response.data.userDetiails));
                    (document.location.href = _URL._POSTLOGINURL);
                    break;
                case 2:
                    $('#lblmsg').text(response.data.msg)
                    break;
                case 3:
                    $('#lblmsg').text(response.data.msg)
                    break;

                default:
                    break;
            }
        }).catch((err) => {
            console.log(err);
        });
}


function getAdminDashboardData() {

    let param = {
        method: 'adminData'
    };
    console.log(param)
    axios
        .post("/admin/api", param).then((response) => {
            console.log(response.data[0][0].TotalEmployees);
            $('#spTotalEmployee').text(response.data[0][0].TotalEmployees)
            $('#spTotalHospitals').text(response.data[1][0].TotalHospitals)
          
        }).catch((err) => {
            console.log(err);
        });
}

function loadHeader() {
    $('#header').load('../includes/header.html');
}

// function loadFooter() {
    
// }

setTimeout(() => {
    loadHeader();
}, 1000);
