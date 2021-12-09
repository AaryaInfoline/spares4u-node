module.exports.global = [
    require('./crossorigin.mw'), // cross origin 
    require('express').json(),  // access body data
    require('express').urlencoded({ extended: true, limit: '50mb' }),
    function (req, res, next) {
        next();
        console.log(req.path);
    }
];
module.exports.one = {
    webuserauth: require('./web/userauth.middleware'),
    mobileuserauth: require('./mobile/userauth.mw'),
    noPathFound: require('./404.mw'),
}