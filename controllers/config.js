exports.dataBaseConfig = {
    server: "N1NWPLSK12SQL-v03.shr.prod.ams1.secureserver.net",
    user: "aasha",
    password: "2!Oryc83",
    port: 1433,
    database: "aasha-bsvwithu",
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