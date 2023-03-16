

function filterData(e) {
    e.preventDefault();

    isLoaderVisible(true);

    let param = {
        empId: _empId,
        month: $('#monthCombo').val(),
        Year: $('#yearCombo').val()
    }

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
            $('.hosp-count-report').addClass('show').removeClass('none');
            isLoaderVisible(false);

        }).catch((err) => {
            console.log(err);
        });



    $('.selectedMonth').text($("#monthCombo option:selected").text());

}