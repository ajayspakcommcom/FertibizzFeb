
let designationWiseData = [], _empId = null;

function getReports() {
    getDesignationWiseData();
}

function getDesignationWiseData() {
    isLoaderVisible(true);
    axios
        .get('/potential-report-data').then((response) => {
            designationWiseData = response.data;
            setDesignationFilters(null, null);
            isLoaderVisible(false);
        }).catch((err) => {
            console.log(err);
        });
}



function setDesignationFilters() {

    let zbmData = designationWiseData.filter(z => z.Designation.toLowerCase() === 'zbm'), zbmHtml = [],
        rbmData = designationWiseData.filter(r => r.Designation.toLowerCase() === 'rbm'), rbmHtml = [],
        kamData = designationWiseData.filter(k => k.Designation.toLowerCase() === 'kam'), kamHtml = [];

    zbmHtml.push(`<option value="none" selected disabled hidden>Select Zbm</option>`);
    rbmHtml.push(`<option value="none" selected disabled hidden>Select Rbm</option>`);
    kamHtml.push(`<option value="none" selected disabled hidden>Select Kam</option>`);

    for (let item of zbmData) {
        zbmHtml.push(`<option value="${item.EmpID}">${item.firstName}</option>`);
    }

    for (let item of rbmData) {
        rbmHtml.push(`<option value="${item.EmpID}">${item.firstName}</option>`);
    }

    for (let item of kamData) {
        kamHtml.push(`<option value="${item.EmpID}">${item.firstName}</option>`);
    }

    $('#zbmCombo').html(zbmHtml.join(''));
    $('#rbmCombo').html(rbmHtml.join(''));
    $('#kamCombo').html(kamHtml.join(''));
    setPrevMonth('monthCombo');
    currentYearSelected('yearCombo');
}


function selectedZbm(event) {
    let rbmData = designationWiseData.filter(r => r.Designation.toLowerCase() === 'rbm'), rbmHtml = [];
    rbmData = rbmData.filter(r => r.ParentID == event.target.value);
    rbmHtml.push(`<option value="none" selected disabled hidden>Select Rbm</option>`);
    for (let item of rbmData) {
        rbmHtml.push(`<option value="${item.EmpID}">${item.firstName}</option>`);
    }
    $('#rbmCombo').html(rbmHtml.join(''));
    _empId = event.target.value;
}

function selectedRbm(event) {
    let kamData = designationWiseData.filter(k => k.Designation.toLowerCase() === 'kam'), kamHtml = [];
    kamData = kamData.filter(k => k.ParentID == event.target.value);
    kamHtml.push(`<option value="none" selected disabled hidden>Select Kam</option>`);
    for (let item of kamData) {
        kamHtml.push(`<option value="${item.EmpID}">${item.firstName}</option>`);
    }
    $('#kamCombo').html(kamHtml.join(''));
    _empId = event.target.value;
}

function selectedKam(event) {
    _empId = event.target.value;
}

