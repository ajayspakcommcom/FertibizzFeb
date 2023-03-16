

function filterData(e) {
    e.preventDefault();

    isLoaderVisible(true)

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

            isLoaderVisible(false)
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

    $('.selectedMonth').text($("#monthCombo option:selected").text());

}