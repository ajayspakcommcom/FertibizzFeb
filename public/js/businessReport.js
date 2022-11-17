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
        console.log(res1.data);
        let reportDataItems = res1.data;


        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Brand');
        data.addColumn('number', 'Business Value');
        data.addColumn('number', 'Unit sold');
        // let rbmArr = []

        reportDataItems.forEach(item => {
            //rbmArr.push([1,2,3])
            data.addRows([[item.brandName, item.TotalSalesVAlue, item.totalUnit]])
        });
        // console.log([rbmArr])
        // //data.addRows([rbmArr]);

        let options = {
            width: 1050,
            height: 400,
            legend: { position: 'right', maxLines: 30 },
            bar: { groupWidth: '40%' },
            isStacked: false,
            title: 'Over All Business Value',
        };

        let chart = new google.visualization.ColumnChart(document.getElementById('business_chart'));
        chart.draw(data, options);

        getAllBusinessReport()


    }));


}


async function getAllBusinessReport() {
    let param = {};
    let brandsArr = ['FOLIGRAF', 'HUMOG', 'ASPORELIX', 'R-HUCOG', 'FOLICULIN', 'AGOTRIG', 'MIDYDROGESTERONE'];
    const businessReport = axios.post("/report/allbusinessReports", param);
    await axios.all([businessReport]).then(axios.spread(function (res1) {
        // console.log(res1.data);
        let reportDataItems = res1.data;
        brandsArr.forEach(brand => {
           // console.log(brand);
            let brandReport = reportDataItems.filter(item => {
                return item.brandName === brand
            })
          //  console.log(brandReport)
            if (brandReport.length > 0) {

                let data = new google.visualization.DataTable();
                data.addColumn('string', 'Brand');
                data.addColumn('number', 'Target');
                data.addColumn('number', 'Actual');
                data.addColumn('number', 'achieved');

                brandReport.forEach(item => {
                    data.addRows([[item.medicineName, item.Targets, item.Qty, item.Targets]])
                });
               // console.log(data)
                let options = {
                    width: 1050,
                    height: 400,
                    legend: { position: 'bottom', maxLines: 30 },
                    bar: { groupWidth: '20%' },
                    isStacked: false,
                    title: brand,
                };

                let chart = new google.visualization.ColumnChart(document.getElementById('business_chart_' + brand));
                chart.draw(data, options);
            }

        })


        // // console.log([rbmArr])
        // // //data.addRows([rbmArr]);



    }));
}