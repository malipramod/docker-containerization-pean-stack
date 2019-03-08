const { Client } = require('pg');
const { pool } = require('../../config/db.config');

let _connect = (callback) => {
    pool.connect((err, client, done) => {
        if (!err)
            return callback({ success: true, data: client }, done);
        return callback({ success: false, data: err }, done);
    });
}

let getData = (body, callback) => {
    _connect((connectionData, done) => {
        if (!connectionData.success) {
            callback(connectionData);
        }
        else {
            let client = connectionData.data;
            let queryStr = restToQuery(body);
            var queryResult = client.query(queryStr);
            queryResult
                .then(data => {
                    callback(data.rows);
                }).catch(ex => {
                    callback(ex);
                }).finally(() => {
                    done();
                });
        }
    });
}

let storeData = (body,callback) => {
    _connect((connectionData, done) => {
        if (!connectionData.success) {
            callback(connectionData);
        }
        else {
            let client = connectionData.data;
        }
    })
}

let restToQuery = (body) => {
    let tableName = body.table;
    let fields = body.fields.toString();
    if (!tableName && !fields)
        throw Error("something went wrong");
    return `select ${fields} from ${tableName}`;
}

module.exports = {
    getData: getData,
    storeData: storeData
}