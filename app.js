/*jshint esversion: 6 */

const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const { isArray } = require("util");
const fileUpload = require('express-fileupload');

// const cors = require('cors');

// var corsOptions = {
//   origin: 'http://ivf1.spak.agency',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }


const app = express();
// default options
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
const twoDay = 1000 * 60 * 60 * 48;
console.log(twoDay);

app.use(sessions({
  secret: "spak5u9rbRWBkWTSmu9kspak",
  saveUninitialized: true,
  cookie: { maxAge: twoDay },
  resave: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cookieParser());
// app.use(cors(corsOptions));

 const hospitalsRoutes = require('./routes/hospitals');
 const employeesRoutes = require('./routes/employee');
 const adminRoutes = require('./routes/admin');
 const hierarchyRoutes = require('./routes/hierarchy');
 const customerRoutes = require('./routes/customer');
 const skuRoutes = require('./routes/sku');
 const potentialRoutes = require('./routes/potentail');
 const businessRoutes = require('./routes/business');
 const competitionRoutes = require('./routes/competition');
 const reportRoutes = require('./routes/report');
 const accountMappingRoutes = require('./routes/accountMapping');
 const performanceRoutes = require('./routes/performance');
 const notificationRoutes = require('./routes/notification');
 const rcRoutes = require('./routes/rc');


app.use(express.static(path.join(__dirname, "public")));

app.use(hospitalsRoutes);
app.use(adminRoutes);
app.use(employeesRoutes);
// app.use(hierarchyRoutes);
app.use(customerRoutes);
app.use(skuRoutes);
app.use(potentialRoutes);
app.use(businessRoutes);
app.use(competitionRoutes);
app.use(reportRoutes);
app.use(accountMappingRoutes);
app.use(performanceRoutes);
app.use(notificationRoutes);
app.use(rcRoutes);

//app.use(managerRoutes);

app.listen(process.env.PORT || 3333, () => {
  console.clear();
  console.log("Application listening on port 3333!");
});