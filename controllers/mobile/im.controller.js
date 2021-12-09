const { itemMaster } = require('../../models/itemMaster');
const functionsController = require('../function.controller')();
module.exports = class iMasterControllerClass {
    static async fetchItemList(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        try {
            var response = await itemMaster.findAndCountAll();
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
        res.json({ status, message: messages.join(), success, count: response.count, imagerooturl: process.env.IMAGE_URL, data: response.rows })
    }
    static async create(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        if (!req.body.companyid) messages.push("Company id require");
        if (!req.body.groupid) messages.push("groupid require");
        if (!req.body.sideid) messages.push("sideid require");
        if (!req.body.itemname) messages.push("itemname require");
        if (!req.body.itemdesc) messages.push("itemdesc require");
        if (!req.body.itemprice) messages.push("itemprice url require");
        if (!req.body.image1) messages.push("image1 url require");
        if (!req.body.image2) messages.push("image2 url require");
        if (messages.length > 0) {
            status = 500;
        } else {
            try {
                var query = {
                    MAKE_ID: req.body.companyid,
                    GROUP_ID: req.body.groupid,
                    YEAR_ID: req.body.yearid,
                    SIDE_ID: req.body.sideid,
                    ITEM_NAME: req.body.itemname,
                    ITEM_DESC: req.body.itemdesc,
                    ITEM_PRICE: req.body.itemprice,
                    ITEM_PICT_URL1: req.body.image1,
                    ITEM_PICT_URL2: req.body.image2,
                    ITEM_PICT_URL3: req.body.image3,
                    ITEM_PICT_URL4: req.body.image4,
                    ITEM_PICT_URL5: req.body.image5,
                    ITEM_VIDEO_URL: req.body.videourl,
                    AUTHORIZE_DATA: req.body.auth_data,
                    AUTHORIZE_USER: req.body.auth_user,
                    AUTHORIZE_DATETIME: req.body.suth_datetime,
                };
                if (req.body.image1) query.ITEM_PICT_URL1 = await functionsController.uploadbase64image(req.body.image1, 'public/storage/');
                if (req.body.image2) query.ITEM_PICT_URL2 = await functionsController.uploadbase64image(req.body.image2, 'public/storage/');
                if (req.body.image2) query.ITEM_PICT_URL3 = await functionsController.uploadbase64image(req.body.image3, 'public/storage/');
                if (req.body.image4) query.ITEM_PICT_URL4 = await functionsController.uploadbase64image(req.body.image4, 'public/storage/');
                if (req.body.image5) query.ITEM_PICT_URL5 = await functionsController.uploadbase64image(req.body.image5, 'public/storage/');

                var response = await itemMaster.create(query);
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
    static async update(req, res) {
        var status = 500;
        var success = false;
        var messages = [];
        if (!req.body.companyid) messages.push("Company id require");
        if (!req.body.groupid) messages.push("groupid require");
        if (!req.body.sideid) messages.push("sideid require");
        if (!req.body.itemname) messages.push("itemname require");
        if (!req.body.itemdesc) messages.push("itemdesc require");
        if (!req.body.itemprice) messages.push("itemprice url require");
        if (!req.body.image1) messages.push("image1 url require");
        if (!req.body.image2) messages.push("image2 url require");
        if (messages.length > 0) {
            status = 500;
        } else {
            try {
                var query = {
                    MAKE_ID: req.body.companyid,
                    GROUP_ID: req.body.groupid,
                    YEAR_ID: req.body.yearid,
                    SIDE_ID: req.body.sideid,
                    ITEM_NAME: req.body.itemname,
                    ITEM_DESC: req.body.itemdesc,
                    ITEM_PRICE: req.body.itemprice,
                    ITEM_PICT_URL1: req.body.image1,
                    ITEM_PICT_URL2: req.body.image2,
                    ITEM_PICT_URL3: req.body.image3,
                    ITEM_PICT_URL4: req.body.image4,
                    ITEM_PICT_URL5: req.body.image5,
                    ITEM_VIDEO_URL: req.body.videourl,
                    AUTHORIZE_DATA: req.body.auth_data,
                    AUTHORIZE_USER: req.body.auth_user,
                    AUTHORIZE_DATETIME: req.body.suth_datetime,
                };
                if (req.body.image1) query.ITEM_PICT_URL1 = await functionsController.uploadbase64image(req.body.image1, 'public/storage/');
                if (req.body.image2) query.ITEM_PICT_URL2 = await functionsController.uploadbase64image(req.body.image2, 'public/storage/');
                if (req.body.image2) query.ITEM_PICT_URL3 = await functionsController.uploadbase64image(req.body.image3, 'public/storage/');
                if (req.body.image4) query.ITEM_PICT_URL4 = await functionsController.uploadbase64image(req.body.image4, 'public/storage/');
                if (req.body.image5) query.ITEM_PICT_URL5 = await functionsController.uploadbase64image(req.body.image5, 'public/storage/');

                var response = await itemMaster.update(query, {
                    where: {
                        ID: req.body.id
                    }
                });
                if (response && response[0]) {
                    status = 200;
                    success = true;
                    messages.push("Your Record saved");
                } else {
                    messages.push("No record found");
                }
            } catch (error) {
                console.log(error);
                var response = null;
                success = false;
                messages.push("Error");
            }
           
        }
        res.json({ status, message: messages.join(), success });
    }
}
