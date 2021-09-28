const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; //Connection URL
const dbName = 'mydb'; //Database Name
const client = new MongoClient(url); //Create a new MongoClient 
const db = client.db(dbName);
const colName = 'products'; //Collection Name
const express = require('express'); 
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const Server = require('./listen.js');
const create = require('./routes/create');
const read = require('./routes/read.js');
const remove = require('./routes/remove.js');
const update = require('./routes/update');

client.connect(function(err){
    if (err) throw err;
    console.log("Connected successfully to Mongodb");
    db.createCollection(colName, function(err, res) {
        if (err) {
            return;
        }
        console.log("Collection created!");
    })
});

app.get('/read', function(req, res){
   read.query(db, colName, function(data){
       res.send(JSON.stringify(data));
   });
})

app.get('/create', function(req, res){
    const item = {
        id: "6",
        name: "Shampoo",
        Description: "Special flavor",
        price: "$8.62",
        type: "500ml",
    };

   //res.send(item.id);
    create.create(db, colName, item, function(msg){
        res.send(msg);
    });
})

app.get('/delete', function(req, res){
    const id = {id: "2"};

    remove.delete(db, colName, id, function(msg){
        res.send(msg);
    });
})

app.get('/update', function(req, res){
    const item = {
        id: "6",
        name: "Soap",
        type: "single pack",
    }

    update.update(db, colName, item, function(msg){
        res.send(msg);
    });
})


//console.log(JSON.stringify(list));

//create.create();

const PORT = 3000;

Server.listen(http, PORT);