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

// SERVE UP HTML PAGE
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
        id: "123"
    })
})

// CREATE A NEW YEARBOOK (with JSON for canvas and key)
// then server sends the new page to client, including newly generated ID
app.post('/api', (req, res) => {
    const page = new Page(req.body)
    page.save().then(() => {
        res.status(201).send(page)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// READ A YEARBOOK (with query string for ID)
app.get('/api', (req, res) => {
    console.log(req.query._id)

    Page.findById(req.query._id).then((page) => {
        if (!page) {
            return res.status(404).send()
        }
        res.send(page)
    }).catch(() => {
        res.status(500).send()
    })
})

// UPDATE A YEARBOOK (with query string for ID, and JSON for canvas)
// "signing a yearbook" corresponds to updating the canvas of a page
// updateOne won't send back the updated page
app.patch('/api', (req, res) => {
    Page.updateOne({ _id: req.query._id }, req.body).then((page) => {
        if (!page) {
            return res.status(404).send()
        }
        res.status(200).send()
    }).catch(() => {
        res.status(500).send()
    })
})

// DELETE A YEARBOOK (with query string for ID, and JSON for key)
app.delete('/api', (req, res) => {
    Page.deleteOne({ _id: req.query._id, key: req.body.key }).then((deletedStats) => {
        if (deletedStats.deletedCount == 0) {
            return res.status(400).send() // nothing deleted, wrong key
        }
        res.status(200).send()
    }).catch(() => {
        res.status(404).send() // yearbook not found
    })
})

// this starts the server
app.listen(port, () => {
    console.log('Yearbook server is up on port ' + port)
})