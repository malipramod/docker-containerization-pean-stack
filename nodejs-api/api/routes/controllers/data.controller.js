const express = require('express');
const postgresqlService = express.Router();
const helper = require('../helper/rest-to-sql');

postgresqlService.get('/', (req, res) => {
    let connectionClient = dataController.getData();
    if (connectionClient);
    res.status(200).json({ "message": connectionClient });
});

postgresqlService.post('/getdata', (req, res) => {
    let body = req.body;
    helper.getData(body, result => {
        res.status(200).json({ "data": result });
    });
});

postgresqlService.post('/store', (req, res) => {
    let body = req.body;
    helper.storeData(body, result => {
        res.status(200).json({ "data": result });
    });
});

module.exports = postgresqlService;
