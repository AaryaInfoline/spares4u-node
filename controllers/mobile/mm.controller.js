const { makeMaster } = require('../../models/makeMaster');
const functionsController  = require('../function.controller')();
module.exports = class mMasterControllerClass {
    static async create(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        console.log(req.body.companylogo);
        if (!req.body.companyname) messages.push("Company Name require");
        if (!req.body.coutnryid) messages.push("Company id require");
        if (!req.body.companyurl) messages.push("Company url require");
        if (messages.length > 0) {
            status = 500;
        } else {
            try {
                console.log(req.body.companylogo);
                var query = {
                    MAKE_NAME: req.body.companyname,
                    COUNTRY_ID: req.body.coutnryid,
                    COMPANY_URL: req.body.companyurl
                };
                if (req.body.companylogo) {
                    query.COMPANY_LOGO_URL = await functionsController.uploadbase64image(req.body.companylogo,'public/storage/');
                }
                var response = await makeMaster.create(query);
            } catch (error) {
                var response = null;
                success = false;
                messages.push("Your Record saved");
            }
            status = 200;
            success = true;
            messages.push("Your Record saved");
        }
        res.json({ status, message: messages.join(), success, data: response });
    }
    static async fetchCompanyList(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        try {
            var response = await makeMaster.findAndCountAll();
        } catch (error) {
            var response = null;
            status = 500;
            messages.push("Error in server")
        }
        if (messages.length > 0) {
            status = 200;
            success = false
        } else {
            status = 200;
            success = true;
            messages.push("List avilable")
        }
        res.json({ status, message: messages.join(), success, count: response.count,imagerooturl:process.env.IMAGE_URL, data: response.rows })
    }
    static async update(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        if (!req.body.companyname) messages.push("Company Name require");
        if (!req.body.coutnryid) messages.push("Company id require");
        if (!req.body.companyurl) messages.push("Company url require");
        if (messages.length > 0) {
            status = 500;
        } else {
            try {
                var query = {
                    MAKE_NAME: req.body.companyname,
                    COUNTRY_ID: req.body.coutnryid,
                    COMPANY_URL: req.body.companyurl
                };
                if (req.body.companylogo) {
                    query.COMPANY_LOGO_URL = await functionsController.uploadbase64image(req.body.companylogo,'public/storage/');
                }
                var response = await makeMaster.update(query, {
                    where: {
                        ID: req.body.id
                    }
                });
            } catch (error) {
                var response = null;
                success = false;
                messages.push("Error");
            }
            if (response[0]) {
                status = 200;
                success = true;
                messages.push("Your Record saved");
            }else{
                messages.push("No record found");
            }
        }
        res.json({ status, message: messages.join(), success });
    }
}
