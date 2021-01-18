const mysql = require('mysql');

/*const mysqlConnection = mysql.createPool({
    connectionLimit: process.env.CONNECTIONLIMIT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});*/
const mysqlConnection = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "clinica"
});

module.exports = mysqlConnection;