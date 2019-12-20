// const bcrypt = require('bcrypt')
// const users = require('../models/users')
module.exports = function(app,passport){
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
            pageTitle: 'Registration - E P O N A'
        })
    })
    //Admin
    app.get('/admin', (req, res) => {
        if (false) {
            res.render('admin/index')
        } else {
            res.redirect('/')
        }
    })
}