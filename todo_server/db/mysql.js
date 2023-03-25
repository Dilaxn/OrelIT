var mysql = require('mysql');
var mysqlParameters = require('../dependencies/dependencies');

//startDBConnection method
function startDBConnection(){
    try{
        //creating mysql connection pool
        var mysqlConnection = mysql.createPool({
            connectionLimit:mysqlParameters.MYSQLPARAMETERS.connectionLimit,
            host: mysqlParameters.MYSQLPARAMETERS.host,
            user: mysqlParameters.MYSQLPARAMETERS.user,
            password: mysqlParameters.MYSQLPARAMETERS.password,
            database: mysqlParameters.MYSQLPARAMETERS.database,
            multipleStatements: true
        });
        return mysqlConnection;
    }
    catch(e){
        console.log(e);
    }
}


module.exports.startDBConnection = startDBConnection;
