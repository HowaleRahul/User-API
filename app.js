const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const errorHandling = require('./middlewares/errorHandling');
const requestLogging = require('./middlewares/requestLogging');
const userRoutes = require('./routes/user');

const morganLogStream=fs.createWriteStream(path.join(__dirname,'./morganLogs.txt'),{flags:'a'});
app.use(morgan('combined',{stream:morganLogStream}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(requestLogging);
app.use(errorHandling);

app.use('/', userRoutes);

app.use((req,res) =>{
    res.status(404).json(["route not found"]);
});

module.exports = app;