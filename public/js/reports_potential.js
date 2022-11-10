function setupPage() {
    console.log('set up pge')
    getPotentialData();
}


async function getPotentialData() {
    let param = {}
    const reqPotential = axios.post("/report/potential", param);
   // const axiosrequest2 = axios.post("/admin/api/actuals", paramActuals);
   //await axios.all([axiosrequestWest,  axiosrequest2]).then(axios.spread(function (res1, res2) {
    await axios.all([reqPotential]).then(axios.spread(function (res1) {
        console.log(res1.data[0]);
        let data = res1.data[0]

        gdata = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Total No of IUI Cycles', data.IUICycle],
            ['Total No of IVF Cycles', data.IVFCycle]
          ]);
      
          var options = {
            title: 'Potential Chart 1',
            width: 300,
            is3D: true,
            legend: { position: 'bottom' },
            backgroundColor: 'transparent'
          };
      
          var chart = new google.visualization.PieChart(document.getElementById('potential_chart1'));
      
          chart.draw(gdata, options);
       // console.log(res2.data[0]);
    }));
}