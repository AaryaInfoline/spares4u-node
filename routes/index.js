require('dotenv').config();
const express = require('express');
const app = express();

app.use(require('../middlewares/middleware').global);
app.use('/',express.static('../public/dist'));
app.use('/data',express.static('../public/storage'));
app.use('/api',require('../routes/mobile.routes'));
app.use('/web',require('../routes/web.routes'));
module.exports.app = app;