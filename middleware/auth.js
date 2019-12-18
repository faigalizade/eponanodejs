const jwt = require('jsonwebtoken')
const TOKEN_SECRET = 'ALFAgroup'

module.exports = function(req,res,next) {
    const token = req.header('auth-token')
    if(token){
        const verified = jwt.verify(token,TOKEN_SECRET)
        req.user = verified
    }else{
        req.userLogged = false
        next('route')
    }
}