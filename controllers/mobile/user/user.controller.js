const { USERS } = require('../../../models/USERS');
module.exports = class userController {
    static create(req, res) {
        USERS.create({
            MOBILE_NO: 443,
            EMAIL_ID: 'fasdfas',
            F_NAME: 'fsdfas'
        }).then(function (jane) {
            res.json(jane.get({
                plain: false
            }));
        });
    }
}
