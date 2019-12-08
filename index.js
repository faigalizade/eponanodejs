const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000


//Init middleware
// app.use(logger)


app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'))


app.get('/', (req, res) => {
    res.render('home',
    {
        pageTitle:'E P O N A',
    })
})

app.get('/about', (req,res) => {
    res.render('about',
    {
        pageTitle: 'About - E P O N A'
    })
})

app.get('/login', (req,res) => {
  res.render('login',
  {
      pageTitle: 'Log In - E P O N A'
  })
})

// ADMIN
app.get('/admin',(req,res) => {
    if(false){
        res.render('admin/index')
    }else{
        res.redirect('/')
    }
})


app.use(express.static(path.join(__dirname, 'public')))

async function start() {
    try {
        mongoose.connect(
        'mongodb+srv://faiq:faiq5518585@cluster0-pmbrg.mongodb.net/test',
        {
          useNewUrlParser: true,
          useFindAndModify: false
        })
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
      console.log(e)
    }
  }
start()