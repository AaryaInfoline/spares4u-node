module.exports.global = [
    require('./crossorigin.mw'), // cross origin 
    require('express').json(),  // access body data
    require('express').urlencoded({extended:true})
];
module.exports.one = {
    webuserauth: require('./web/userauth.middleware'),
    mobileuserauth: require('./mobile/userauth.mw'),
}