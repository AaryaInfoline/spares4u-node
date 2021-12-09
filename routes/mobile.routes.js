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

const mMasterController = require('../controllers/mobile/mm.controller');
routes.post("/company/create", middleware.mobileuserauth, mMasterController.create);
routes.post("/company/update", middleware.mobileuserauth, mMasterController.update);
routes.get("/company/list", middleware.mobileuserauth, mMasterController.fetchCompanyList);

const yearController = require('../controllers/year.controller');
routes.post("/years/create", middleware.mobileuserauth, yearController.create);
routes.post("/years/update", middleware.mobileuserauth, yearController.update);
routes.get("/years/list", middleware.mobileuserauth, yearController.fetchYearlist);

const groupController = require('../controllers/group.controller');
routes.post("/group/create", middleware.mobileuserauth, groupController.create);
routes.post("/group/update", middleware.mobileuserauth, groupController.update);
routes.get("/group/list", middleware.mobileuserauth, groupController.fetchgrouplist);

const sideController = require('../controllers/side.controller');
routes.post("/side/create", middleware.mobileuserauth, sideController.create);
routes.post("/side/update", middleware.mobileuserauth, sideController.update);
routes.get("/side/list", middleware.mobileuserauth, sideController.fetchSidelist);


const itemMasterController = require('../controllers/mobile/im.controller');
routes.post("/item/create", middleware.mobileuserauth, itemMasterController.create);
routes.post("/item/update", middleware.mobileuserauth, itemMasterController.update);
routes.get("/item/list", middleware.mobileuserauth, itemMasterController.fetchItemList);

routes.get('*', middleware.mobileuserauth, middleware.noPathFound);
module.exports = routes;