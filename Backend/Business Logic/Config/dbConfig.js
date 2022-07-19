require('dotenv').config()

const config = {
    user : process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.SERVER,
    port: 1433,
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:30000
    },
    options:{
        encrypt:true,
        trustServerCertificate: true,
        trustedConnection: true
    }
}

module.exports={...config}