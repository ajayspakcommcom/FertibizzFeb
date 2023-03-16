
let designationWiseData = [], _empId = null;

function getReports() {
    getDesignationWiseData();
}

function getDesignationWiseData() {
    axios
        .get('/potential-report-data').then((response) => {
            designationWiseData = response.data;
            setDesignationFilters(null, null);
        }).catch((err) => {
            console.log(err);
        });
}

//setMonth('monthCombo');

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

function filterData(e) {
    e.preventDefault();

    let param = {
        empId: _empId,
        month: $('#monthCombo').val(),
        Year: $('#yearCombo').val()
    }


    axios
        .post('/potential-report-iui-cycle-categary', param).then((response) => {
            let resultGroup = groupByKey(response.data, 'Cycle'), showHtml = [], total = 0;

            for (let key in resultGroup) {
                showHtml.push(`<tr><td>${key}</td> <td>${resultGroup[key].length}</td></tr>`);
                total += parseInt(resultGroup[key].length);
            }
            showHtml.push(`<tr><td>Total</td> <td><b>${total}</b></td></tr>`);
            $('#iuiData').html(showHtml.join(''));
            $('.iui-cycle-report').addClass('show').removeClass('none');


        }).catch((err) => {
            console.log(err);
        });


    axios
        .post('/potential-report-ivf-cycle-categary', param).then((response) => {
            let resultGroup = groupByKey(response.data, 'Cycle'), showHtml = [], total = 0;

            for (let key in resultGroup) {
                showHtml.push(`<tr><td>${key}</td> <td>${resultGroup[key].length}</td></tr>`);
                total += parseInt(resultGroup[key].length);
            }
            showHtml.push(`<tr><td>Total</td> <td><b>${total}</b></td></tr>`);
            $('#ivfData').html(showHtml.join(''));
            $('.ivf-cycle-report').addClass('show').removeClass('none');

        }).catch((err) => {
            console.log(err);
        });

    axios
        .post('/hosp-count-brand-wise', param).then((response) => {
            let showHtml = [];

            for (let item of response.data) {
                showHtml.push(`<tr>
                    <td>${item.AGOTRIG}</td>
                    <td>${item.ASPORELIX}</td>
                    <td>${item.FOLICULIN}</td>
                    <td>${item.FOLIGRAF}</td>
                    <td>${item.HUMOG}</td>
                    <td>${item.MIDYDROGEN}</td>
                    <td>${item['R-HUCOG']}</td>
                    <td>${item.SPRIMEO}</td>
                </tr>`);
            }
            $('#hosp-count').html(showHtml.join(''));

        }).catch((err) => {
            console.log(err);
        });


    axios
        .post('/top-15-business-records', param).then((response) => {
            let showHtml = [];
            for (let item of response.data) {
                showHtml.push(`<tr>
                    <td>${item.accountName}</td>
                    <td>${item.CENTRENAME}</td>
                    <td>${item.DoctorName}</td>
                    <td>${item.City}</td>
                    <td>${item.StateName}</td>
                    <td>${item.QtyOrdered}</td>          
                </tr>`);
            }
            $('#top-15-b-records').html(showHtml.join(''));

        }).catch((err) => {
            console.log(err);
        });


    $('.selectedMonth').text($("#monthCombo option:selected").text());

}