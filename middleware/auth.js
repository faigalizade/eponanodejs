const jwt = require('jsonwebtoken')
const TOKEN_SECRET = 'ALFAgroup'

module.exports = function(req,res,next) {
    const authHeader = req.header('Authorization')
    if(!authHeader){
        req.userLogged = false
        next()
    }else{
        req.userLogged = true
        next()
    }
}