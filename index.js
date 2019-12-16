const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')
const bcrypt = require('bcrypt')
const users = require('./models/users')
const PORT = process.env.PORT || 3000

//Init middleware
// app.use(logger)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(cookieParser())

//GET
app.get('/', (req, res) => {

    res.render('home', {
        page: 'home',
        pageTitle: 'E P O N A',
    })
})

app.get('/test', async (req, res) => {
    var userMap = {}
    await users.find({
        mail: 'faiq.alizade.00@mail.ru'
    }, function (err, users) {
        var i = 0
        users.forEach(function (user) {
            userMap[i] = user;
            i++
        });
        res.render('home', {
            page: 'home',
            pageTitle: 'E P O N A',
        })
    })
    console.log(userMap)

})

app.get('/about', (req, res) => {
    res.render('about', {
        page: 'about',
        pageTitle: 'About - E P O N A'
    })
})

app.get('/sale', (req, res) => {
    res.render('sale', {
        page: 'sale',
        pageTitle: 'SALE - E P O N A'
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        page: 'login',
        pageTitle: 'Log In - E P O N A',
        incorrect: false
    })
})
app.get('/register', (req, res) => {
    res.render('register', {
        page: 'register',
        pageTitle: 'Registration - E P O N A',
        isEmail: false
    })
})
//POST

app.post('/register', async (req, res) => {
    var isUser
    var reqEmail = req.body.registerEmail.toLowerCase()
    async function checkIsUser(){
        await users.find({
            mail: reqEmail
        }, function (err, users) {
            if(users.length != 0){
                isUser = false
            }else{
                isUser = true
            }
        })
    }
    await checkIsUser()
    if (isUser) {
        var newUser = new users({
            name: req.body.registerName,
            surname: req.body.registerSurname,
            mail: reqEmail,
            password: req.body.CreatePassword
        })        
        newUser.save((err, result) => {
            // console.log(err, result)
        })
        res.render('home', {
            page: 'home',
            pageTitle: 'E P O N A',
        })
    } else {
        res.render('register', {
            page: 'register',
            pageTitle: 'Registration - E P O N A',
            isEmail: true
        })
    }
})
app.post('/login', async (req, res) => {
    var isUser
    var reqEmail = req.body.login_username.toLowerCase()
    async function checkIsUser(){
        await users.find({
            mail: reqEmail
        }, function (err, users) {
            if(users.length == 0){
                isUser = false
            }else{
                if(users[0].password == req.body.login_password){
                    isUser = true
                }else{
                    isUser = false
                }
            }
        })
    }
    await checkIsUser()

    if (isUser) {
            // res.cookie('user', 'john doe', { maxAge: 900000, httpOnly: true });
            res.render('home', {
                page: 'home',
                pageTitle: 'E P O N A',
            })
    } else {
        res.render('login', {
            page: 'register',
            pageTitle: 'Log in - E P O N A',
            incorrect: true
        })
    }
})
// ADMIN
app.get('/admin', (req, res) => {
    if (false) {
        res.render('admin/index')
    } else {
        res.redirect('/')
    }
})


app.use(express.static(path.join(__dirname, 'public')))

async function start() {
    mongoose.connect(
        'mongodb+srv://faiq:faiq5518585@cluster0-pmbrg.mongodb.net/epona?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
}
start()