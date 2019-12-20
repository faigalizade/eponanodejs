const bcrypt = require('bcrypt')
const users = require('../models/users')
module.exports = function (app, passport) {
    app.post('/register', async (req, res) => {
        var reqEmail = req.body.registerEmail.toLowerCase()
        const emailExist = await users.findOne({
            mail: reqEmail
        })
        if (req.body.CreatePassword.length < 6) {
            return res.render('register', {
                page: 'register',
                pageTitle: 'Registration - E P O N A',
                errorMsg: 'Password should be at least 6 character'
            })
        }
        if (emailExist) {
            res.render('register', {
                page: 'register',
                pageTitle: 'Registration - E P O N A',
                errorMsg: 'This Email address has been used!'
            })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.CreatePassword, salt)
            var newUser = new users({
                name: req.body.registerName,
                surname: req.body.registerSurname,
                mail: reqEmail,
                password: hashPassword
            })
            newUser.save((err, result) => {
                // console.log(err, result)
            })
            res.redirect('/login')
        }
    })
    app.post('/login', function (req, res, next) {
        if(!req.isAuthenticated()){
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    return res.render('login', {
                        page: 'login',
                        pageTitle: 'Log In - E P O N A',
                        errorMsg: 'Email or password is incorrect'
                    })
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req, res, next)
        }else{
            return res.redirect('/')
        }
    })
}