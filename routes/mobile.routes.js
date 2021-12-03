const express = require('express');
const routes = express.Router();
// user controller route manage
const userController = require('../controllers/mobile/user/auth.controller');
const middleware = require('../middlewares/middleware').one;

routes.post('/user/auth/create', userController.register);
routes.post('/user/auth/login', userController.login);
routes.post('/user/auth/refresh', userController.refreshToken);
routes.get('/user/auth/check', middleware.mobileuserauth, userController.checkauth);

const countryController = require('../controllers/country.controller');
routes.post('/country/create', middleware.mobileuserauth, countryController.createCountry);
routes.post('/country/update', middleware.mobileuserauth, countryController.editCountry);
routes.get('/country/list', middleware.mobileuserauth, countryController.fetchCountry);
module.exports = routes;