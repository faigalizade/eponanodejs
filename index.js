const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
// const fs = require('fs')
// const jwt = require('jsonwebtoken')
const passport = require('passport')
const session = require('express-session')
const TOKEN_SECRET = 'ALFAgroup'
const PORT = process.env.PORT || 3000

//Init middleware
require('./middleware/auth')(passport)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    secret: TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 60000}
}))


app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
//GET
require('./middleware/gets')(app,passport)
//POST
require('./middleware/posts')(app,passport)

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