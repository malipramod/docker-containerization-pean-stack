const { Pool } = require('pg');

const _dbUserName = "postgres";
const _dbPassword = "postpass";
const _port ="5432";
const _databaseName="parkinglot";
const _localServer="localhost";

const pool= new Pool({
    user: _dbUserName,
    host: _localServer,
    database: _databaseName,
    password: _dbPassword,
    port: _port,
});

module.exports = {
    pool: pool
}