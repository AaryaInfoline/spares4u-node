const express = require('express');
const routes = express.Router();

// user controller route manage
const userController = require('../controllers/mobile/user/user.controller');
routes.post('/user/create',userController.create);
module.exports = routes;