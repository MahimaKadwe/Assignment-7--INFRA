 const express = require('express')
 const MongoClient = require('mongodb').MongoClient

 const app = express()

 app.use(express.json())
 var database

 app.get('/', (req, resp) => {
resp.send('Welcome to mongodb APi')
 })
app.get('/api/startup_log', (req, resp) => {
database.collection('startup_log').find({}).toArray((err, result) => {
        if(err) throw err
        resp.send(result)
    })   
})

 app.listen(8080, () => {
    MongoClient.connect('mongodb://127.0.0.1:27017/demo', { useNewUrlParser: true}, (error, result) => {
    if(error) throw error
    database = result.db('local')
    console.log('Connection successful')
 })
 
})