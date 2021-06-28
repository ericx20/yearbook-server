// this is a test file for connecting to MongoDB

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'yearbook-server'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('pages').insertOne({
        canvas: 'testing1',
        key: 'key1'
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert page')
        }
    })
})