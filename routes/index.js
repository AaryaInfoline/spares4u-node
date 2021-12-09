require('dotenv').config();
const express = require('express');
const path  =  require('path');
const app = express();
var middleware = require('../middlewares/middleware');

app.use(middleware.global);
app.all('/getdetails/:id',(req,res,next)=>{console.log(req.body); res.json({})});
app.use('/', express.static(path.join(__dirname,'../public/dist')));
app.use('/data/public/storage', express.static(path.join(__dirname,'../public/storage')));
app.use('/api', require('../routes/mobile.routes'));
app.use('/web', require('../routes/web.routes'));

module.exports.app = app;