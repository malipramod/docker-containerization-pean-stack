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
            let queryStr = _restToQuerySelect(body);
            let queryResult = client.query(queryStr);
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

let storeData = (body, callback) => {
    _connect((connectionData, done) => {
        if (!connectionData.success) {
            callback(connectionData);
        }
        else {
            let results = [];
            let client = connectionData.data;
            let queryArray = _restToQueryInsert(body);
            queryArray.forEach((query,index) => {
                queryResult = client.query(query);
                queryResult
                    .then(data => {
                        results.push(data);
                        if (index == queryArray.length-1)
                            callback(results);
                    }).catch(ex => {
                        results.push(ex);
                        if (index == queryArray.length-1)
                            callback(results);
                    });
                
            });

            done();
        }
    })
}


let _restToQuerySelect = body => {
    let tableName = body.table;
    let fields = body.fields.toString();
    if (!tableName && !fields)
        throw Error("something went wrong");
    return `select ${fields} from ${tableName}`;
}

let _restToQueryInsert = body => {
    let tableName = body.table;
    let data = body.data;
    let queries = [];
    if (!tableName && !fields)
        throw Error("something went wrong");
    data.forEach(obj => {
        let coloums = Object.keys(obj).toString();
        let values = Object.values(obj);
        let valuesString = "";
        for (let i = 0; i < values.length; i++) {
            if (i == values.length - 1)
                valuesString += `'${values[i]}  '`;
            else
                valuesString += `'${values[i]}',`;
        }
        queries.push(`INSERT INTO ${tableName}(${coloums}) VALUES(${valuesString})`);
    });
    return queries;
}

module.exports = {
    getData: getData,
    storeData: storeData
}