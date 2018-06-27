const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
var tableController = require('./controllers/tableController.js');

var app = express();
app.use(bodyParser.json());
app.use('/tables', tableController);

app.listen(3000,'192.168.3.222', () => console.log('Server started at port : 192.168.3.222:3000'));
