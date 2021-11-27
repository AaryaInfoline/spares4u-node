require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('../routes/routes');
app.use(require('../middlewares/middleware').global);
app.use('/',express.static('../public/dist'));
app.use('/data',express.static('../public/storage'));
app.use('/',routes);


module.exports.app = app;