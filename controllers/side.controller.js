const { sideMaster } = require("../models/sideMaster");

module.exports = class sideControllerclass {

    static async create(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        if (!req.body.name) messages.push("Side name Require");
        if (messages.length > 0) {
            status = 500;
        } else {
            try {
                var query = {
                    SIDE_DESC: req.body.name,
                };
                var response = await sideMaster.create(query);
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
    static async fetchSidelist(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        try {
            var response = await sideMaster.findAndCountAll();
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
        res.json({ status, message: messages.join(), success, count: response.count, data: response.rows })
    }
    static async update(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        if (!req.body.id) messages.push("Side id Require");
        if (!req.body.name) messages.push("Side Name Require");
        if (messages.length > 0) {
            status = 500;
        } else {
            try {
                var query = {
                    SIDE_DESC: req.body.name,
                };
                var response = await sideMaster.update(query, {
                    where: {
                        SIDE_ID: req.body.id
                    }
                });
                console.log(response);
                if (response[0]) {
                    status = 200;
                    success = true;
                    messages.push("Your updated saved");
                } else {
                    messages.push("No record found");
                }
            } catch (error) {
                console.log(error);
                var response = null;
                success = false;
                messages.push("Error occurs");
            }
           
        }
        res.json({ status, message: messages.join(), success, data: response });
    }
}