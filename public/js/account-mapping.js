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

function setupPotentialPage() {
    //    console.log('setup account mapping for potentials')

    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 2];
    let param = {
        empId: empId
    };

    axios
        .post(`/account-mapping/${empId}/potential-list`, param).then((response) => {
            //console.log(response.data)
            let lists = response.data,
                listArr = [],
                totalSelftCycle = 0,
                totalDonorCycle = 0,
                totalAntagonistcycles = 0,
                totalAgonistCycles = 0,
                totalIVF = 0,
                totalIUI = 0,
                totalIVFFreshPickups = 0,
                totalIVFFrozenTransfers = 0,
                percIVF_FrozenTransfers = 0,
                percIVF_FreshPickups = 0;

            lists.forEach(list => {
                listArr.push(
                    `<tr>
                        <td align='center'><input ${list.isApproved === false ? `checked` : ''} type='checkbox' class='chkbox' value='${list.potentialId}'  id=${list.potentialId} /></td>
                        <td>${camelCaseText(list.CENTRENAME)}</td>
                        <td>${camelCaseText(list.DoctorName)}</td>
                        <td align='right'>${list.IUICycle}</td>
                        <td align='right'>${list.IVFCycle}</td>
                        <td align='right'>${list.FreshPickUps}</td>
                        <td align='right'>${list.frozenTransfers}</td>
                        <td align='right'>${list.SelftCycle}</td>
                        <td align='right'>${list.DonorCycles}</td>
                        <td align='right'>${list.AgonistCycles}</td>
                        <td align='right'>${list.Antagonistcycles}</td>
                    </tr>
                `);
                // reoprt 2
                totalSelftCycle += parseInt(list.SelftCycle);
                totalDonorCycle += parseInt(list.DonorCycles);

                // reoprt 3
                totalAntagonistcycles += parseInt(list.Antagonistcycles)
                totalAgonistCycles += parseInt(list.AgonistCycles);


                // report 1
                totalIVF += parseInt(list.IVFCycle)
                totalIUI += parseInt(list.IUICycle)
                // report 1- sub report
                totalIVFFreshPickups += parseInt(list.FreshPickUps)
                totalIVFFrozenTransfers += parseInt(list.frozenTransfers)
            });
            $('#potentialData').append(listArr.join(''));

            percIVF_FrozenTransfers = percentage(totalIVFFrozenTransfers, totalIVF);
            percIVF_FreshPickups = percentage(totalIVFFreshPickups, totalIVF);
            //console.log(totalIVF, totalIUI);
            potentialChart1(totalIVF, totalIUI, percIVF_FrozenTransfers, percIVF_FreshPickups);
            potentialChart2(totalSelftCycle, totalDonorCycle);

            potentialChart3(totalAntagonistcycles, totalAgonistCycles)

        }).catch((err) => {
            console.log(err);
        });
}

function approveListingPotential() {
    //ƒconsole.log('approve selected Listing');
    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data"));

    var endPoints = $(".chkbox:checked").map(function () {
        return {
            potentialId: parseInt($(this).val()),
            rbmId: parseInt(userData.empId),
        };
    }).get();
    //console.log(endPoints);
    Promise.all(endPoints.map((endpoint) => axios.post('/center-potentials-approved', endpoint))).then(
        axios.spread((...allData) => {
            //console.log({ allData });
            alert('Approved Sucessfully')
            //  redirect('/hospitals');
        })
    );
    return false;
}

/********************* */
function setupBusinessPage() {

    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 2],
        param = {
            empId: empId
        };

        axios
        .post(`/account-mapping/${empId}/business-list`, param).then((response) => {
            //console.log(response.data)
             let lists = response.data,
                 listArr = []
            //     totalSelftCycle = 0,
            //     totalDonorCycle = 0,
            //     totalAntagonistcycles = 0,
            //     totalAgonistCycles = 0,
            //     totalIVF = 0,
            //     totalIUI = 0,
            //     totalIVFFreshPickups = 0,
            //     totalIVFFrozenTransfers = 0,
            //     percIVF_FrozenTransfers = 0,
            //     percIVF_FreshPickups = 0
            ;

             lists.forEach(list => {
                listArr.push(
                    `<tr>
                        <td align='center'><input ${list.isApproved === false ? `checked` : ''} type='checkbox' class='chkbox' value='${list.potentialId}'  id=${list.potentialId} /></td>
                        <td>${camelCaseText(list.CENTRENAME)}</td>
                        <td>${camelCaseText(list.DoctorName)}</td>
                        <td align='right'>${list.brandGroup1}</td>
                        <td align='right'>${list.brandGroup2}</td>
                        <td align='right'>${list.brandGroup3}</td>
                        <td align='right'>${list.brandGroup4}</td>
                        <td align='right'>${list.brandGroup5}</td>
                        <td align='right'>${list.brandGroup6}</td>
                        <td align='right'>${list.brandGroup7}</td>
                        <td align='right'>${list.brandGroup8}</td>
                        <td align='right'>${list.brandGroup9}</td>
                    </tr>
                `);
            //     // reoprt 2
            //     totalSelftCycle += parseInt(list.SelftCycle);
            //     totalDonorCycle += parseInt(list.DonorCycles);

            //     // reoprt 3
            //     totalAntagonistcycles += parseInt(list.Antagonistcycles)
            //     totalAgonistCycles += parseInt(list.AgonistCycles);


            //     // report 1
            //     totalIVF += parseInt(list.IVFCycle)
            //     totalIUI += parseInt(list.IUICycle)
            //     // report 1- sub report
            //     totalIVFFreshPickups += parseInt(list.FreshPickUps)
            //     totalIVFFrozenTransfers += parseInt(list.frozenTransfers)
             });
             $('#potentialData').append(listArr.join(''));

            // percIVF_FrozenTransfers = percentage(totalIVFFrozenTransfers, totalIVF);
            // percIVF_FreshPickups = percentage(totalIVFFreshPickups, totalIVF);
            // //console.log(totalIVF, totalIUI);
            // potentialChart1(totalIVF, totalIUI, percIVF_FrozenTransfers, percIVF_FreshPickups);
            // potentialChart2(totalSelftCycle, totalDonorCycle);

            // potentialChart3(totalAntagonistcycles, totalAgonistCycles)

        }).catch((err) => {
            console.log(err);
        });


}