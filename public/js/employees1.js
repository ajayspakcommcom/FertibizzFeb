function getKamList() {

    let empIdd = JSON.parse(window.localStorage.getItem('BSV_IVF_Admin_Data')).empId;

    console.log('Kam List Ready');
    let param = {
        empId: empIdd
    }

    axios
    .post('/employees/kamlist', param).then((response) => {
        // console.log(response.data[0])
        console.log(response.data);

        let list = response.data, listArr = [];

        list.forEach(data => {
            listArr.push(
                `<tr>
                    <td>${data.firstName}</td>
                    <td>${data.email}</td>
                    <td>${data.MobileNumber}</td>
                    <td>${data.EmpNumber}</td>
                    <td>${data.hoCode}</td>
                    <td>${data.StateName}</td>
                    <td>${data.DOJ}</td>
                    <td>
                        <a href="/employees/centre-list/${data.empID}">Account Mapping Data</a>
                        |
                        <a href="/employees/centre-list/${data.empID}">Master Data</a>
                    </td>
                </tr>
            `)
        });
        $('#kamData').append(listArr.join(''))

        //let res = response.data[0];
        //console.log(res);
        // if (res.sucess === 'true') {
        //     redirect('/sku');
        // } else {
           
        // }
    }).catch((err) => {
        console.log(err);
    });


}