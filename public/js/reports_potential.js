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
       // console.log(res1.data);
        let data = res1.data,
          totalIVF = 0,
          totalIUI = 0,
          ivfCycleArr = [],
          iuiCycleArr = [];

        data.forEach(item => {
          totalIVF += parseInt(item.IVFCycle)
          totalIUI += parseInt(item.IUICycle)
          ivfCycleArr.push({
            name: parseInt(item.IVFCycle), value: parseInt(item.IVFCycle)
          })
          iuiCycleArr.push({
            name: parseInt(item.IUICycle), value: parseInt(item.IUICycle)
          })
        });


        console.log(totalIVF)
        console.log(ivfCycleArr)

        chartData = {
                name: "Total IUI/IVF Cycle: " + parseInt(totalIUI + totalIVF),
                children: [
                  {name: "Total IUI "+totalIUI+"" ,value: totalIUI,
                  children: iuiCycleArr
                 },
                  {
                    name: "Total IVF "+totalIVF+"",value: totalIVF,
                    children: ivfCycleArr
                  }
                 
                ]
            };

              console.log(chartData)
          //    console.log(data)


              const color = d3.scaleOrdinal(d3.schemePaired);
            Sunburst()
                .data(chartData)
                .color(d => color(d.name))
                 .minSliceAngle(.1)
                 .excludeRoot(false)
                 .maxLevels(10)
                .showLabels(true)
                .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
                (document.getElementById('potential_chart1'));

            // populateDataTable(response.data);


    //     gdata = google.visualization.arrayToDataTable([
    //         ['Task', 'Hours per Day'],
    //         ['Total No of IUI Cycles', data.IUICycle],
    //         ['Total No of IVF Cycles', data.IVFCycle]
    //       ]);
      
    //       var options = {
    //         title: 'Potential Chart 1',
    //         width: 300,
    //         is3D: true,
    //         legend: { position: 'bottom' },
    //         backgroundColor: 'transparent'
    //       };
      
    //       var chart = new google.visualization.PieChart(document.getElementById('potential_chart1'));
      
    //       chart.draw(gdata, options);
    //    // console.log(res2.data[0]);
    }));
}