/*
//Defining PORT Number
const PORT = process.env.SERVICE_PORT;
const SESSIONTIMEOUT = 120;
const SERVICE_URL = process.env.SERVICE_URL;
//Defining MySQL connection parameters

const MYSQLPARAMETERS = {
        connectionLimit: process.env.DB_CONNLIMIT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
    */

//Defining PORT Number
const PORT = 5000;
const SESSIONTIMEOUT = 120;

const MYSQLPARAMETERS = {
    connectionLimit: 2,
    host: 'localhost', //host: '192.168.8.100'
    user: 'root', //user: 'root'
    password: '12345678', //password: 'Mysql@ncnn233',
    database: 'todo', //MySql db name
    //timezone: 'Z'
}

//Exporting PORT number, MySQL and parameters parameters
module.exports = {
    PORT: PORT,
    SESSIONTIMEOUT: SESSIONTIMEOUT,
    MYSQLPARAMETERS: MYSQLPARAMETERS
    //SERVICE_URL: SERVICE_URL
};
