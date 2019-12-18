const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('./models/users')
const TOKEN_SECRET = 'ALFAgroup'
const auth = require('./middleware/auth.js')
const PORT = process.env.PORT || 3000

//Init middleware
app.use(express.json())
app.use(auth)
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
    if(!req.userLogged){
        res.render('login', {
            page: 'login',
            pageTitle: 'Log In - E P O N A',
            incorrect: false
        })
    }else{
        res.render('home', {
            page: 'home',
            pageTitle: 'E P O N A',
        })
    }
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
        var reqEmail = req.body.registerEmail.toLowerCase()
    const emailExist = await users.findOne({
        mail: reqEmail
    })
    if (emailExist) {
        res.render('register', {
            page: 'register',
            pageTitle: 'Registration - E P O N A',
            isEmail: true
        })
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.CreatePassword,salt)
        var newUser = new users({
            name: req.body.registerName,
            surname: req.body.registerSurname,
            mail: reqEmail,
            password: hashPassword
        })
        newUser.save((err, result) => {
            // console.log(err, result)
        })
        res.render('home', {
            page: 'home',
            pageTitle: 'E P O N A',
        })
    }
})


app.post('/login', async (req, res) => {
        var reqEmail = req.body.login_username.toLowerCase()
    const emailExist = await users.findOne({
        mail: reqEmail
    })
    if (!emailExist) {
        res.render('login', {
            page: 'login',
            pageTitle: 'Log In - E P O N A',
            incorrect: true
        })
    } else {
        const validPass = await bcrypt.compare(req.body.login_password,emailExist.password)
        if(validPass){
            const token = jwt.sign({_id:emailExist._id},TOKEN_SECRET)
            // console.log(token);
            res.header('Authorization',token,).render('home', {
                page: 'home',
                pageTitle: 'E P O N A',
            })
        }else{
            res.render('login', {
                page: 'login',
                pageTitle: 'Log In - E P O N A',
                incorrect: true
            })
        }
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