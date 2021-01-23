const express = require('express')
const app = express()

require('./src/db/mongoose.js')
const Page = require('./src/models/page.js')

ObjectId = require('mongodb').ObjectID;

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
    if (!req.query.canvas) { // req.query.canvas is the query string ?canvas=<query string>
        return res.send({
            error: 'Error, please enter canvas!'
        })
    }

    res.json({
        canvas: req.query.canvas,
        id: 123
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
        _id: "1234" // HARDCODED
    })
})

// READ A YEARBOOK (with query string)
app.get('/read', (req, res) => {
    console.log('READ YEARBOOK')
    console.log(req.query._id)

    Page.findById(ObjectId(req.query._id)).then((page) => {
        console.log(page)
        if (!page) {
            return res.status(404).send()
        }
        res.send(page)
    }).catch((e) => {
        res.status(500).send()
    })
})


// this starts the server
app.listen(port, () => {
    console.log('Yearbook server is up on port ' + port)
})