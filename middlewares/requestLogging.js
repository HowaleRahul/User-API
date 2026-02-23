const express = require("express");
const app = express();
const fs = require('fs');

app.use((req,res,next) =>{
    const timeStamp = new Date();
    const log = `${timeStamp} - ${req.url} - ${req.method} - ${req.ip}\n`;
    fs.appendFile("Log.txt",log,(err) =>{
        res.status(200);
    })
    next();
});

module.exports = app;