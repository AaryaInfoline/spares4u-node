var jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json({
            status: 403,
            success: false,
            message: 'No credentials sent!'
        });
    }
    try {
        var response = jwt.verify(req.headers.authorization, process.env.AUTH_SECRATE_KEY);
        //console.log(response);
        req.user = response;
        next();
    } catch (err) {
        return res.json({
            status: 400,
            success: false,
            message: 'Invalid Authorization'
        });
    }
};