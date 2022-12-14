function getMyHospitalList() {

    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 1];
        //console.log(empID);
        
    let param = {
        empId: empId
    };

    axios
        .post('/hospitals-list/', param).then((response) => {
            console.log(response.data)
            let lists = response.data,
                listArr = [];

            lists.forEach(list => {
                listArr.push(
                    `<tr>
                    <td>${camelCaseText(list.CENTRENAME)}</td>
                    <td>${camelCaseText(list.DoctorName)}</td>
                    <td><a href="/potential-add?cid=${list.customerId}&centreName=${list.CENTRENAME}&drName=${list.DoctorName}&empId=${empId}" class="btn btn-default">View Potential</a></td>
                    <td><a href="/add-business?cid=${list.customerId}&chainAccountType=${list.chainAccountTypeId}&kamId=${parseInt(getIdFromURL())}" class="btn btn-default">View Business</a></td>
                    <td><a href="/add-competition?cid=${list.customerId}" class="btn btn-default">View Competition</a></td>
                    <td><a href="#" class="btn btn-default">View Contract</a></td>
                </tr>
                    `)
            });
            $('#centerList').append(listArr.join(''))

        }).catch((err) => {
            console.log(err);
        });
}