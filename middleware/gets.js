// const bcrypt = require('bcrypt')
// const users = require('../models/users')
const Categories = require('../models/categories')
module.exports = function (app, passport) {
    app.get('/', (req, res) => {
        res.render('home', {
            page: 'home',
            pageTitle: 'E P O N A',
            isAuth: req.isAuthenticated(),
            user: req.user
        })
    })



    app.get('/about', (req, res) => {
        res.render('about', {
            page: 'about',
            pageTitle: 'About - E P O N A',
            isAuth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.get('/sale', (req, res) => {
        res.render('sale', {
            page: 'sale',
            pageTitle: 'SALE - E P O N A',
            isAuth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.get('/login', (req, res) => {
        if (!req.isAuthenticated()) {
            return res.render('login', {
                page: 'login',
                pageTitle: 'Log In - E P O N A'
            })
        }
        res.redirect('/')
    })
    app.get('/register', (req, res) => {
        if (req.isAuthenticated) {
            return res.redirect('/')
        }
        res.render('register', {
            page: 'register',
            pageTitle: 'Registration - E P O N A'
        })
    })
    //Admin
    app.get('/admin', (req, res) => {
        if (true) {
            res.render('admin/index')
        } else {
            res.redirect('/')
        }
    })

    app.get('/admin/orders', (req, res) => {
        res.render('admin/orders')
    })

    app.get('/admin/products', (req, res) => {
        res.render('admin/products')
    })


    app.get('/admin/categories', async (req, res) => {
        categoryMap = await Categories.find({})
        // function createTree(arr){
        //     for(let i in arr){
        //         console.log(arr[i])
        //     }
        // }
        // await createTree(categoryMap)

        function createTree(arr) {
            var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem

            // First map the nodes of the array to an object -> create a hash table.
            for (var i = 0, len = arr.length; i < len; i++) {
                arrElem = arr[i]
                mappedArr[arrElem.name] = arrElem
                mappedArr[arrElem.name].child = []
            }


            for (var name in mappedArr) {
                if (mappedArr.hasOwnProperty(name)) {
                    mappedElem = mappedArr[name]
                    // If the element is not at the root level, add it to its parent array of children.
                    if (mappedElem.parent) {
                        mappedArr[mappedElem['parent']].child.push(mappedElem)
                    }
                    // If the element is at the root level, add it to first level elements array.
                    else {
                        tree.push(mappedElem)
                    }
                }
            }
            return tree
        }
        tree = createTree(categoryMap)
        console.log(JSON.stringify(tree))
        res.render('admin/categories', {
            categories: categoryMap
        })
    })
}