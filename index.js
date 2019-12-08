const express = require('express')
const path = require('path')
// const members = require('./members')
// const logger = require('./middleware/logger')
const app = express()


//Init middleware
// app.use(logger)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'))

// Get all members
app.get('/', (req, res) => {
    res.render('index',
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
//Get single  member
// app.get('/api/member/:id',(req,res) => {
//     res.json(members.filter(member => member.id === parseInt(req.params.id)))
// })

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))