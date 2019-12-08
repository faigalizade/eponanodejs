const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()

//Init middleware
// app.use(logger)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'))
// Get all members
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
// Get single  member
app.get('/api/member/:id',(req,res) => {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
})

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000


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