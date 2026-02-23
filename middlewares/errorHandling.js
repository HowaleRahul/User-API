const express = require('express');
const app = express();

app.use((err, req, res,next) =>{
    console.log("Error", err.message)
    res.status(500).json([err.message]);
    next();
});

module.exports = app;