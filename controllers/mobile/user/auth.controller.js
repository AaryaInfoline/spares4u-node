const { USERS } = require('../../../models/USERS');
const { user_sessions } = require('../../../models/user_sessions');
var jwt = require('jsonwebtoken');
var moment = require('moment');

module.exports = class authController {
    static async register(req, res) {
        var status = 500;
        var success = false;
        var message = [];
        try {
            var user = await USERS.create({
                MOBILE_NO: req.body.mobile,
                EMAIL_ID: req.body.email,
                F_NAME: req.body.name,
                PASSWORD: req.body.password,
                SALT: ""
            });
            if (user) {
                success = true;
                status = 200;
                message.push("user Created");
            } else {
                message.push("user Not Created");
            }
        } catch (err) {
            console.log(err);
            message.push("Enter Valid Number");
        }
        res.json({ status, success, message: message.join() })
    }
    static async login(req, res) {
        console.log(req.body);
        var message = [];
        var success = false;
        var status = 404;
        var token;
        try {
            var user = await USERS.findOne({
                where: {
                    MOBILE_NO: req.body.mobile
                }
            })
            if (user) {
                message.push("user found");
                if (user.validPassword(req.body.password)) {
                    user = user.toJSON();
                    delete user.SALT;
                    delete user.createdAt;
                    delete user.updatedAt;
                    try {
                        var usession = await user_sessions.create({
                            user_id: user.ID,
                            expiresIn: moment().add(1, 'year').format('YYYY-MM-DD HH:mm:ss')
                        })
                        if (usession) {
                            usession = usession.toJSON();
                            delete usession.createdAt;
                            delete usession.updatedAt;
                            status = 200;
                            success = true;
                            message.push("You are authorised");
                            var refreshSecrate = process.env.SECRATE_KEY + user.PASSWORD;
                            delete user.ID;
                            delete user.PASSWORD;
                            var refreshtoken = jwt.sign({ ...user, ...usession, type: 1 }, refreshSecrate, { expiresIn: process.env.REF_TOKEN_TIME }); //"1d"
                            var authtoken = jwt.sign({ ...user, ...usession, type: 2 }, process.env.AUTH_SECRATE_KEY, { expiresIn: process.env.AUTH_TOKEN_TIME });
                            token = {
                                authToken: authtoken,
                                refreshtoken: refreshtoken
                            }
                        } else {
                            status = 500;
                            success = false
                            message.push("Error Occurs");
                        }

                    } catch (error) {
                        console.log(error)
                        message.push("Error Occurs");
                    }
                } else {
                    message.push("Check Credentials");
                }
            } else {
                message.push("Check Credentials");
            }
        } catch (error) {
            console.log(error)
            message.push("Error Occurs");
        }
        res.json({ status, success, message: message.join(), token });
    }
    static async refreshToken(req, res) {
        var status = 404;
        var message = [];
        var success = false;
        var authtoken;
        if (!req.body.authtoken) message.push("Auth Token Necessary");
        if (!req.body.reftoken) message.push("Refresh TOken Necessary");
        if (message.length > 0) return res.json({ status, message: message.join(), success });
        try {
            var response = jwt.decode(req.body.reftoken);
            try {
                var dbresp = await user_sessions.findOne({
                    include: [
                        {
                            model: USERS
                        }
                    ],
                    where: { id: response.id }
                });
                if (dbresp) {
                    dbresp = dbresp.toJSON();
                } else {
                    message.push("Invalid Authentication");
                    return res.json({ status, message: message.join(), success });
                }
                console.log(response, dbresp);
                try {
                    var reftokendata = jwt.verify(req.body.reftoken, process.env.SECRATE_KEY + dbresp.USER.PASSWORD);
                    if (reftokendata && reftokendata.type == 1) {
                        reftokendata.type = 2;
                        delete reftokendata.iat;
                        delete reftokendata.exp;
                        success = true;
                        status = 200;
                        message.push("Authorised");
                        console.log(process.env.AUTH_TOKEN_TIME);
                        console.log(process.env.REF_TOKEN_TIME);
                        authtoken = jwt.sign(reftokendata, process.env.AUTH_SECRATE_KEY, { expiresIn: process.env.AUTH_TOKEN_TIME });
                        message.push("You are authorised");
                    } else {
                        message.push("invalid token");
                    }
                } catch (error) {
                    console.log(error);
                    message.push("invalid token");
                }

            } catch (error) {
                console.log(error);
                message.push("invalid token");
            }
            return res.json({ status, message: message.join(), success, authtoken });
        } catch (error) {
            console.log(error);
            message.push("Invalid Authentication");
            return res.json({ status, message: message.join(), success });
        }
    }
    static checkauth(req, res) {
        res.json({
            status: 200,
            success: true,
            message: "ok"
        })
    }
}

