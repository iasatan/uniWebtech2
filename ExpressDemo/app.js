const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const logger = require('./middleware/logger');
const MongoClient = require("mongodb").MongoClient;

var db;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);
app.use("/api/members", require("./middleware/api/members"));

MongoClient.connect("mongodb://localhost:27017", (err, database) => {
    if (err) return console.log(err);
    db = database.db("mymembers");
    app.listen(port, () => {
        console.log("Server running on " + port + "....");
    });
});

app.get("/asd", (req, res) => {
    var cursos = db.collection("member").find().toArray((err, result) => {
        res.send(result);
    })
});

app.post("/asd", (req, res) => {
    db.collection("member").insertOne(req.body);
    console.log("inserted");
    res.redirect("/asd");
});




