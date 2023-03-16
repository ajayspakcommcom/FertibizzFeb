

function filterData(e) {
    e.preventDefault();
    console.log('filtered Executed!');
    isLoaderVisible(true);
    let param = {
        empId: _empId,
        month: $('#monthCombo').val(),
        Year: $('#yearCombo').val()
    }

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
            $('.top-15-report').addClass('show').removeClass('none');
            isLoaderVisible(false);
        }).catch((err) => {
            console.log(err);
        });


    $('.selectedMonth').text($("#monthCombo option:selected").text());

}