exports.dataBaseConfig = {
    server: "A2NWPLSK14SQL-v01.shr.prod.iad2.secureserver.net",
    user: "BSV_IVF",
    password: "4_uGdn74",
    port: 1433,
    database: "BSV_IVF",
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };