 const express = require('express')
 const MongoClient = require('mongodb').MongoClient

 const app = express()

 app.use(express.json())
 var database
 var age

 app.get('/', (req, resp) => {
resp.send('Welcome to mongodb APi')
 })
app.get('/api/startup_log', (req, resp) => {
database.collection('startup_log').find({}).toArray((err, result) => {
        if(err) throw err
        resp.send(result)
    })   
    
})
app.get('/api/startup_log/:id',(req, resp) => {
    database.collection('startup_log').find({id: parseInt(req.params.id)}).toArray((err, result) => {
        if(err) throw err
        resp.send(result)
    })
})

app.post('/api/startup_log/addstartup_log' , (req, resp) => {
    let res = database.collection('startup_log').find({}).sort({id: -1}).limit(1)
    res.forEach(obj => {
        if(obj){
            let startup_log = {
                id: obj.id +1,
                name: req.body.name
            }
            database.collection('startup_log').insertOne(startup_log, (err, result) =>{
                if(err) resp.status(500).send(err)
                resp.send("Added Successfully")
            })
        }
    })
}) 

app.put('/api/startup_log/:id',(req, resp) => {
       let startup_log = {
            id: parseInt(req.params.id),
            name: req.body.name
        }
        database.collection('startup_log').updateOne(
            {id: parseInt(req.params.id)}, 
            {$set: startup_log}, (err, result) =>{
            if(err) throw err
            resp.send(startup_log)
        })
    })

    app.delete('/api/startup_log/:id', (req, resp) => {
            database.collection('startup_log').deleteOne({id: parseInt(req.params.id)}, (err, result) =>{
                if(err) throw err
                resp.send('Data is deleted')
            })
        })
        
 app.listen(8080, () => {
    MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true}, (error, result) => {
    if(error) throw error
    database = result.db('local'),
    console.log('Connection successful')
 })
 
})

/*const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require("./initDB")();

const ProductRoute = require("./Routes/Product.route");
app.use("/local", ProductRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});*/