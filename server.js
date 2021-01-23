const express = require('express')
const app = express()
require('./src/db/mongoose.js')
const Page = require('./src/models/page.js')
const path = require('path');

// make port Heroku's env variable
// but fallback to 3000 if run locally
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '/public')

app.use(express.static(publicPath))
app.use(express.json())

app.get('', (req, res) => {
    res.sendFile(path.join(publicPath + '/index.html'))
    console.log('i said hello!!')
})


// THIS IS A TEST (with query string)
app.get('/test', (req, res) => {
    if (!req.query.lineData) { // req.query.lineData is the query string ?lineData=<query string>
        return res.send({
            error: 'Error, please enter lineData!'
        })
    }

    res.json({
        lineData: req.query.lineData,
        code: 123
    })
})

// CREATE A NEW YEARBOOK (with JSON)
// and send the code (hardcoded code for now)
// for now, database won't have code
app.post('/create', (req, res) => {
    console.log('CREATE NEW YEARBOOK')
    // res.json(req.body) // parse JSON
    console.log(req.body)
    res.json({
        code: 1234 // HARDCODED
    })
})

// READ A YEARBOOK (with query string)
app.get('/read', (req, res) => {
    if (!req.query.code) { // add database check if it exists
        return res.send({
            error: 'Error, code not found!'
        })
    }

    console.log('READ YEARBOOK')
    console.log(req.query.code)
    res.json({
        lineData: 'here-is-lineData', // ALSO HARDCODED
    })
})


// this starts the server
app.listen(port, () => {
    console.log('Yearbook server is up on port ' + port)
})