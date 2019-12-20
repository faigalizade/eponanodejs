const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const users = require('../models/users')

function initializePassport(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async function (username, password, done) {
        const user = await users.findOne({
            mail: username
        })
        if (user == null) {
            return done(null, false, {
                message: 'Email is not found'
            })
        }
        try {
            const isValidPass = await bcrypt.compare(password, user.password)
            if (isValidPass) {
                return done(null, user)
            } else {
                return done(null, false, {
                    message: 'Email or password is not right'
                })
            }
        } catch (e) {
            done(e)
        }
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        users.findById(id, function (err, user) {
            done(err, user)
        })
    })
}
module.exports = initializePassport