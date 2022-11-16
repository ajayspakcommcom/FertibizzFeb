//const { getAllBusinessReport } = require("../../controllers/reportController");

function drawBusinessChart1() {
    let data = google.visualization.arrayToDataTable([
        ['Element', 'ACHIEVEMENT', 'TARGET', '% ACH', { role: 'annotation' }],
        ['Brand', 100, 24, 20, ''],
        ['Brand Wise', 16, 22, 23, ''],
        ['Brand Wise', 28, 19, 29, '']
    ]);

    let options = {
        width: 550,
        height: 400,
        legend: { position: 'bottom', maxLines: 3 },
        bar: { groupWidth: '80%' },
        isStacked: true,
        title: 'Business Chart'
    };

    let chart = new google.visualization.ColumnChart(document.getElementById('business_chart'));
    chart.draw(data, options);
}



async function drawBusinessChart() {
    let param = {};
    const businessReport = axios.post("/report/businessReport", param);
    await axios.all([businessReport]).then(axios.spread(function (res1) {
        //console.log(res1.data);
        let reportDataItems = res1.data;


        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Brand');
        data.addColumn('number', 'Business Value');
        // let rbmArr = []

        reportDataItems.forEach(item => {
            //rbmArr.push([1,2,3])
            data.addRows([[item.brandName, item.TotalSalesVAlue]])
        });
        // console.log([rbmArr])
        // //data.addRows([rbmArr]);

        let options = {
            width: 1050,
            height: 400,
            legend: { position: 'bottom', maxLines: 30 },
            bar: { groupWidth: '40%' },
            isStacked: true,
            title: 'Over All Business Value',
        };

        let chart = new google.visualization.ColumnChart(document.getElementById('business_chart'));
        chart.draw(data, options);

        getAllBusinessReport()


    }));


}


async function getAllBusinessReport() {
    let param = {};
    const businessReport = axios.post("/report/allbusinessReports", param);
    await axios.all([businessReport]).then(axios.spread(function (res1) {
       // console.log(res1.data);
        let reportDataItems = res1.data;
        debugger;

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Brand');
        data.addColumn('number', 'Target');
        data.addColumn('number', 'Actual');
        data.addColumn('number', 'achieved');
        // let rbmArr = []
        let brandReportFOLIGRAF = reportDataItems.filter(item => {
          return  item.brandId === 1
        })

        console.log(brandReportFOLIGRAF)
        brandReportFOLIGRAF.forEach(item => {
            //rbmArr.push([1,2,3])
            data.addRows([[item.medicineName, item.Targets, item.Qty, item.Targets]])
        });
        // // console.log([rbmArr])
        // // //data.addRows([rbmArr]);

        let options = {
            width: 1050,
            height: 400,
            legend: { position: 'bottom', maxLines: 30 },
            bar: { groupWidth: '40%' },
            isStacked: false,
            title: 'FOLIGRAF',
        };

        let chart = new google.visualization.ColumnChart(document.getElementById('business_chart_FOLIGRAF'));
        chart.draw(data, options);


    }));
}