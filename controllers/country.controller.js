const { countryMaster } = require("../models/countryMaster")

module.exports = class countryControllerClass {
    static async createCountry(req, res) {
        var status = 500;
        var success = false;
        var message = [];
        if (!req.body.name) message.push("Country Name missing.");
        if (!req.body.continent) message.push("Continent Name missing.");

        if (message.length == 0) {
            try {
                var country = await countryMaster.create({
                    COUNTRY_NAME: req.body.name,
                    CONTINENT: req.body.continent
                })
                if (country) {
                    status = 200;
                    success = true;
                    message.push("Entry Success fully")
                }
            } catch (error) {
                //console.log(error)
                message.push("Error Occurs")
            }
        }
        console.log(req.user)
        res.json({ status, success, message: message.join() })
    }
    static async editCountry(req, res) {
        var status = 500;
        var success = false;
        var message = [];
        if (!req.body.id) message.push("Id missing.");
        if (!req.body.name) message.push("Country Name missing.");
        if (!req.body.continent) message.push("Continent Name missing.");
        try {
            if (message.length == 0) {
                var country = await countryMaster.update({
                    COUNTRY_NAME: req.body.name,
                    CONTINENT: req.body.continent
                }, {
                    where: {
                        COUNTRY_ID: req.body.id
                    }
                })
                if (country) {
                    status = 200;
                    success = true;
                    message.push("Successfully updated")
                }
            }
        } catch (error) {
            message.push("Error Occurs")
        }
        res.json({ status, success, message: message.join() })
    }
    static async fetchCountry(req, res) {
        var status = 500;
        var success = false;
        var message = [];
        var data = {};
        try {
            var countrylist = await countryMaster.findAndCountAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if (countrylist.count > 0) {
                status = 200;
                success = true;
                message.push("List")
                data.count = countrylist.count;
                data.data = countrylist.rows;
            } else {
                message.push("No record Found")
            }
        } catch (error) {
            message.push("Error Occurs")
        }
       // console.log({ status, success, message: message.join(), ...data })
        res.json({ status, success, message: message.join(), ...data })
    }
}