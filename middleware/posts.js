const bcrypt = require('bcrypt')
const users = require('../models/users')
const Categories = require('../models/categories')
const multer = require('multer')

function makeHash(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
//Multer disk storage
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb(null, makeHash(10)+'.jpg')
    }
})

//init upload

const upload = multer({
    storage: storage
})

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
        if (!req.isAuthenticated()) {
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
        } else {
            return res.redirect('/')
        }
    })
    app.post('/login', function (req, res, next) {
        if (!req.isAuthenticated()) {
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
        } else {
            return res.redirect('/')
        }
    })

    app.post('/admin/categories', upload.single('categoryImg'), function (req, res, next) {
        const file = req.file
        if (!file) {
            // const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        var newCategory = new Categories({
            name: req.body.categoryName,
            nameLowcase: req.body.categoryName.toLowerCase(),
            img: file.filename,
            description: req.body.categoryDesc != "" ? req.body.categoryDesc : '-'
        })
        newCategory.save()

        res.redirect('/admin/categories')
    })
}