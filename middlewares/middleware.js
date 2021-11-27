module.exports.global = [
    require('./crossorigin.mw'), // cross origin 
    require('express').json()  // access body data
];
module.exports.one = {
    userauth: require('./web/userauth.middleware'),
}