
function pageSetUp() {
    getPerformanceData();
}

function getPerformanceData() {
    console.log('ready')
    let urlArr = window.location.href.split('/'),
    centerId = urlArr[urlArr.length - 1];
    console.log(centerId);
    axios
        .get('/view-performanceData/' + centerId).then((response) => {
            console.log(response.data);
            
            printCenterDetail(response.data[0][0]);

            let centreData = response.data[0],
                potentialData = response.data[1],
                listArr = [];

                centreData.forEach(data => {
                listArr.push(
                        `<tr>
                            <td>${data.CENTRENAME}</td>
                            <td>${data.doctorName}</td>
                            <td>${data.SpecialtyName}</td>
                        </tr>
                    `)
                });

            $('#centreData').append(listArr.join(''));

            listArr = [];

            potentialData.forEach(data => {
                listArr.push(
                        `<tr>
                            <td>${data.IUICycle}</td>
                            <td>${data.IVFCycle}</td>
                            <td>${data.FreshPickUps}</td>
                            <td>${data.frozenTransfers}</td>
                            <td>${data.SelftCycle}</td>
                            <td>${data.DonorCycles}</td>
                            <td>${data.AgonistCycles}</td>
                            <td>${data.Antagonistcycles}</td>
                        </tr>
                    `)
                });

            $('#potentialData').append(listArr.join(''));
            


        }).catch((err) => {
            console.log(err);
    });
}

function printCenterDetail(data) {
    $('#centreName').text(data.CENTRENAME);
    $('#stateName').text(data.stateName);
    $('#emailId').text(data.email);
    $('#accountTypeId').text(data.name);
}   