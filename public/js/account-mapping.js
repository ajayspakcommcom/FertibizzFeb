function getMyHospitalList() {
    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
        param = {
            empId: userData.empId
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
                    <td><a href="/account-mapping/potentials/10" class="btn btn-default">View Potential</a></td>
                    <td><a href="#" class="btn btn-default">View Business</a></td>
                    <td><a href="#" class="btn btn-default">View Competition</a></td>
                    <td><a href="#" class="btn btn-default">View Contract</a></td>
                    <td><a href="#" class="btn btn-default">View Profile</a></td>
                </tr>
                    `)
            });
            $('#centerList').append(listArr.join(''))

        }).catch((err) => {
            console.log(err);
        });
}