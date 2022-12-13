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
        let indx = 0;

        console.log('id', list);

        list.forEach((data) => {
            indx = indx + 1;
            listArr.push(
                `<tr>
                    <td>${indx}</td>
                    <td>${data.firstName}</td>
                    <td>${`Head Quater`}</td>
                    <td><a href="../account-mapping/${data.empID}">Account Mapping Data</a></td>
                    <td>
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