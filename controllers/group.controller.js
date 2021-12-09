const { groupMaster } = require("../models/groupMaster");

module.exports = class groupController {

    static async create(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        if (!req.body.name) messages.push("Group name Require");
        if (messages.length > 0) {
            status = 500;
        } else {
            try {
                var query = {
                    GROUP_DESC: req.body.name,
                };
                var response = await groupMaster.create(query);
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
    static async fetchgrouplist(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        try {
            var response = await groupMaster.findAndCountAll();
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
        if (!req.body.id) messages.push("Group id Require");
        if (!req.body.name) messages.push("Group Name Require");
        if (messages.length > 0) {
            status = 500;
        } else {
            try {
                var query = {
                    GROUP_DESC: req.body.name,
                };
                var response = await groupMaster.update(query, {
                    where: {
                        GROUP_ID: req.body.id
                    }
                });
            } catch (error) {
                var response = null;
                success = false;
                messages.push("Error occurs");
            }
            if (response[0]) {
                status = 200;
                success = true;
                messages.push("Your updated saved");
            } else {
                messages.push("No record found");
            }
        }
        res.json({ status, message: messages.join(), success, data: response });
    }
}