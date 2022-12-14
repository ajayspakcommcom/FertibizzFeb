

function validateMe() {

    if ($('#cmbMonth').val() === "") {
        alert('Month field is empty');
        $('#cmbMonth').focus();
        return false;
    }

    if ($('#cmbYear').val() === "") {
        alert('Year field is empty');
        $('#cmbYear').focus();
        return false;
    }


    if ($('#iuiTxt').val() === "") {
        alert('Total no. of IUI cycles is empty');
        $('#iuiTxt').focus();
        return false;
    }

    if ($('#ivfTxt').val() === "") {
        alert('Total no. of IVF cycles is empty');
        $('#ivfTxt').focus();
        return false;
    }

    if ($('#freshTxt').val() === "") {
        alert('Fresh pick-ups is empty');
        $('#freshTxt').focus();
        return false;
    }

    if ($('#frozenTxt').val() === "") {
        alert('Frozen Transfers is empty');
        $('#frozenTxt').focus();
        return false;
    }

    if ($('#patientTxt').val() === "") {
        alert('Self (Patient) cycles is empty');
        $('#patientTxt').focus();
        return false;
    }

    if ($('#donotTxt').val() === "") {
        alert('Donor cycles is empty');
        $('#donotTxt').focus();
        return false;
    }

    if ($('#agonistTxt').val() === "") {
        alert('Agonist cycles is empty');
        $('#agonistTxt').focus();
        return false;
    }

    if ($('#antagonistTxt').val() === "") {
        alert('Antagonist cycles is empty');
        $('#antagonistTxt').focus();
        return false;
    }

    let pId = new URLSearchParams(window.location.search).get('pid'),
        iuiTxt = $('#iuiTxt').val(),
        ivfTxt = $('#ivfTxt').val(),
        freshTxt = $('#freshTxt').val(),
        frozenTxt = $('#frozenTxt').val(),
        patientTxt = $('#patientTxt').val(),
        donotTxt = $('#donotTxt').val(),
        agonistTxt = $('#agonistTxt').val(),
        antagonistTxt = $('#antagonistTxt').val();


    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
        param = {
            iuiTxt: $('#iuiTxt').val(),
            ivfTxt: $('#ivfTxt').val(),
            freshTxt: $('#freshTxt').val(),
            frozenTxt: $('#frozenTxt').val(),
            patientTxt: $('#patientTxt').val(),
            donotTxt: $('#donotTxt').val(),
            agonistTxt: $('#agonistTxt').val(),
            antagonistTxt: $('#antagonistTxt').val(),
            hospitalId: new URLSearchParams(window.location.search).get('cid'),
            month: parseInt($('#cmbMonth').val()),
            year: parseInt($('#cmbYear').val()),
            empId: parseInt(userData.empId)
        }

    //console.log(param)


    axios
        .post('/center-potentials-add/', param).then((response) => {
            //console.log(response.data[0])
            let res = response.data[0];
            if (res.sucess === 'true') {
                redirect('/hospitals');
            } else {
                //     $('#lblMsg').text(res.msg);
            }
        }).catch((err) => {
            console.log(err);
        });

}

function getPotentialsDetails() {
  //  console.log('get my details')

    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")), 
    param = {hospitalId:'', empId:''}, 
    urlArr = window.location.href.split('/'),
    empId = urlArr[urlArr.length - 1].slice(-2);

        // param = {
        //     hospitalId: new URLSearchParams(window.location.search).get('cid'),
        //     empId: parseInt(userData.empId)
        // }

    
    console.log(empId);

 
        if(userData.post.toLowerCase() == 'kam') {

            param.hospitalId = new URLSearchParams(window.location.search).get('cid');
            param.empId = parseInt(userData.empId);
  
        } else if(userData.post.toLowerCase() == 'rbm') {
            param.hospitalId = new URLSearchParams(window.location.search).get('cid');
            param.empId = parseInt(empId);

        } else {
            console.log('');
        }
        

         
    axios
        .post('/center-potentials-details', param).then((response) => {
            console.log(response.data[0])
            if (response.data.length > 0) {
                let res = response.data[0];
                console.log(res);
                $('#iuiTxt').val(res.IUICycle);
                $('#ivfTxt').val(res.IVFCycle);
                $('#freshTxt').val(res.FreshPickUps);
                $('#frozenTxt').val(res.frozenTransfers);
                $('#patientTxt').val(res.SelftCycle);
                $('#donotTxt').val(res.DonorCycles);
                $('#agonistTxt').val(res.AgonistCycles);
                $('#antagonistTxt').val(res.Antagonistcycles);

                let potentialEnteredFor = res.PotentialEnteredFor,
                    arr = potentialEnteredFor.split('-'),
                    year = arr[0],
                    month = arr[1] <= 9 ? parseInt(arr[1].substring(1, 2)) : parseInt(arr[1])
                $('#cmbYear').val(year)
                //$('#cmbMonth').val(month)
                getFirstDayPreviousMonth();
            }

        }).catch((err) => {
            console.log(err);
        });
}

function showDrNameCentreName() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    $('#drName').text(params.drName);
    $('#centreName').text(params.centreName);
}

function potentialCal(fId, sId, targetElem) {
  let firstElem = parseInt($(`#${fId}`).val()), secondElem = parseInt($(`#${sId}`).val()), targetEl = $(`#${targetElem}`);
  targetEl.val(firstElem - secondElem);
}

$('input').change(function(e) { 
    potentialCal('ivfTxt', 'freshTxt', 'frozenTxt');
    potentialCal('ivfTxt', 'patientTxt', 'donotTxt');
    potentialCal('ivfTxt', 'agonistTxt', 'antagonistTxt');
});

showDrNameCentreName();
DisabledInput('disabled');

function approveMe() {
    console.log('approved me Clicked');

    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
    param = {
        hospitalId: new URLSearchParams(window.location.search).get('cid'),
        rbmId: parseInt(userData.empId),
        kamId: 24, // @TODO THIS NEED TO CHANGE
    }

axios
    .post('/center-potentials-approved', param).then((response) => {
     //   console.log(response.data[0])
        if (response.data.length > 0) {
            let res = response.data[0];
            console.log(res);
            if (res.sucess === 'true')
                {
                    redirect('/hospitals');
                    // @TODO: THIS NEED TO CHANGE
                }
        }

    }).catch((err) => {
        console.log(err);
    });

    return false;
}


function showCheckBoxApproveBtn() {
    console.log('showCheckBoxApproveBtn called');
    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data"));
    console.log(userData);

    if(userData.post.toLowerCase() == 'kam') {
        console.log('ram');
        $('.hideApproveChk').hide();
        $('#btnApprove').hide();
    }

    else if(userData.post.toLowerCase() == 'rbm') {
        console.log('rbm');
        $('#resetBtn').hide();
        $('#saveBtn').hide();
    }
}

showCheckBoxApproveBtn();