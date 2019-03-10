const express = require('express');
const fileRouter = express.Router();
const helper = require('../helper/file.helper');

fileRouter.post('/updateJson', (req, res) => {
    console.log("here in ");
    let fileContenet = req.body;
    helper.updateFile(fileContenet, result => {
        if (result.status)
            return res.status(200).json({ message: "Successfully updated" });
        else
            return res.status(500).status({message:result.err});            
    });
});


module.exports = fileRouter;