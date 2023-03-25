
const {query} = require('express');

//snake case underscore between words to create separation
//const snakeCaseKeys = require('snakecase-keys');

//connection to mysql db
var mysqlConnection;
//common functions
var helpers;

module.exports = (injectedMysqlConnection, injectedHelpers) => {
    mysqlConnection = injectedMysqlConnection;
    helpers = injectedHelpers;

    //start mysql connection
    mysqlConn = mysqlConnection.startDBConnection();

    return {
        _getConnection: _getConnection,
        _beginTransaction: _beginTransaction,
        _commit: _commit,
        _release: _release,
        _rollback: _rollback,
        _getTaskList: _getTaskList,
        _createTask : _createTask,
        _updateTask: _updateTask,
        _deleteTask:_deleteTask
    }
}


// to return a single connection from the pool
function _getConnection() {
    //promise returns a result to await.
    return new Promise((resolve, reject) => {
        console.log("1")
        mysqlConn.getConnection(function (err, conn) {
            if (err) {
                console.log("found")
                reject(err)} // not connected!

            resolve(conn);
        });
    });
}

// to begin the transaction for the given connection
function _beginTransaction(dbconn) {
    //promise returns a result to await.
    return new Promise((resolve, reject) => {

        dbconn.beginTransaction(function (err) {
            if (err) {
                dbconn.release();
                reject(err);
            }

            resolve();
        });
    });
}

// to commit the transaction of a given connection
function _commit(dbconn) {
    //promise returns a result to await.
    return new Promise((resolve, reject) => {

        dbconn.commit(function (err) {
            dbconn.release();
            if (err) reject(err); // not committed!

            resolve();
        });
    });
}

// to rollback the transaction for the given connection
function _rollback(dbconn) {
    //promise returns a result to await.
    return new Promise((resolve, reject) => {

        dbconn.rollback(function (err) {
            dbconn.release();
            if (err) reject(err); // not rolledback!

            resolve();
        });
    });
}

function _release(dbconn) {
    //promise returns a result to await.
    return new Promise((resolve, reject) => {
        dbconn.release();
    });
}


//get user list
function _getTaskList() {

    //promise returns a result to await.
    return new Promise((resolve, reject) => {
        console.log("2")
        let queryString = `SELECT *  FROM task`
        console.log("3")
        mysqlConn.query(queryString, function (err, result) {
            if (err) {
                console.log("found2")
                reject(err)}

            resolve(result);
        });
    });
}

//create task
function _createTask(data, dbconn) {
    console.log(data)
    //promise returns a result to await.
    return new Promise((resolve, reject) => {
        console.log("2")
        let queryString  = `INSERT INTO task SET ?`
        console.log("3")
        dbconn.query(queryString, data, (error, result) => {
            if (error)
                reject(error)
            resolve(result)
        })
    });
}

//update task
function _updateTask(data) {
    console.log(data)
    //promise returns a result to await.
    return new Promise((resolve, reject) => {
        let queryString = `UPDATE task SET 
            content = '` + data.content +  `' WHERE id = ` + data.t_id + `;`;

        //execute the query
        mysqlConn.query(queryString, function (err, result) {
            if (err) reject(err);

            resolve(result);
        });
    });
}

//update task
function _deleteTask(data) {
    console.log(data)
    //promise returns a result to await.
    return new Promise((resolve, reject) => {
        let queryString = `DELETE FROM task WHERE id=${data.t_id}`

        //execute the query
        mysqlConn.query(queryString, function (err, result) {
            if (err) reject(err);

            resolve(result);
        });
    });
}

