NODE
skálázható
prototípus készítés
szerver
kicsi az entry point, könnyű fejleszteni benne
paypal, kevesebb fájl, kevesebb kód springhez képest, 2x annyi kérés, 30%-al gyorsabb response time
aszinkron(étterem példa) io intenzív alkalmazásokhoz, cpu intenzívhez nem való
1 szállon fut, ne blokkoljuk

demo
------------------------------------------------------------------------------------------------------------

app.js
function hello(name) {
    console.log("hello "+name)
}

hello("adam")
------------------------------------------------------------------------------------------------------------

alert, window, document nem létezik


------------------------------------------------------------------------------------------------------------
global scope, modules
csinálj logger modult
var url="https://github.com/iasatan"

function log(message) {
    console.log(new Date()+": "+message);
}

module.exports.log =log;
module.exports.github=url;
------------------------------------------------------------------------------------------------------------


var logger = require('./logger');

console.log(logger);

------------------------------------------------------------------------------------------------------------
ne var legyen a module, hanem conts így nem lehet megváltoztatni
const logger = require('./logger');
logger=1;
console.log(logger);

------------------------------------------------------------------------------------------------------------
var url="https://github.com/iasatan"

function log(message) {
    console.log(new Date()+": "+message);
}

module.exports =log;
******************************
const log=requiry('./logger');
log("asd");
------------------------------------------------------------------------------------------------------------
var x=;
(function (exports, require, module, __filename, __dirname) { 
console.log(__filename)
console.log(__dirname)
------------------------------------------------------------------------------------------------------------
path, fájl specifikus cuccok
const path = require('path');
var pathObj=path.parse(__filename);
console.log(pathObj.base);

------------------------------------------------------------------------------------------------------------
os, gép specifikus cuccok(memória, cpu, os fajta stb)

const os = require('os');

var totalMemory = os.totalmem();
var freemem = os.freemem();
console.log("Free memory: " + freemem);
console.log("Total memory: " + tot
------------------------------------------------------------------------------------------------------------
fs, fájl rendszer
van asszinkron és szinkron változat is, aszinkron a jó

const fs = require('fs');
// const files = fs.readdirSync("./");
// console.log(files);
fs.readdir("asd", function (err, files) {
    if (err) console.log("Elbasztad: " + err);
    else console.log(files);
})
------------------------------------------------------------------------------------------------------------
event
EventEmmiter, nagybetű mert osztály
addListener és on ugyanaz
const EventEmiter = require('events');
const emitter = new EventEmiter();

emitter.addListener("messageLogged", function () {
    console.log("Listener called");
});

emitter.emit("messageLogged")
************************************************************
ARGUMENTUM 
const EventEmiter = require('events');
const emitter = new EventEmiter();

emitter.addListener("messageLogged", function (args) {
    console.log("Listener called", args);
});

emitter.emit("messageLogged", {id: 1, url: "https://github.com"})
************************************************************
ARROW FUNCTION
const EventEmiter = require('events');
const emitter = new EventEmiter();

emitter.addListener("messageLogged", (args) => {
    console.log("Listener called", args);
});

emitter.emit("messageLogged",

------------------------------------------------------------------------------------------------------------
SAJÁT CLASS
const EventEmmiter = require("events");
var url = "https://github.com/iasatan"

class Logger extends EventEmmiter {
    log(message) {
        console.log(new Date() + ": " + message);
        this.emit("messageLogged", {id: 1, url: "https://github.com"})
    }

}

module.exports = Logger;
module.exports.github = url;

************************************************************

const Logger = require('./logger');
const logger = new Logger();

logger.addListener("messageLogged", (args) => {
    console.log("Listener called", args);
});

logger.log("asd");
------------------------------------------------------------------------------------------------------------
HTTP SERVER SOCKET

const http = require("http");
const server = http.createServer();
server.listen(8080);
console.log("Listening on port 8080...");
server.on("connection", (socket) => {
    console.log("New connection...");
});
------------------------------------------------------------------------------------------------------------
HTTP SERVER REQ RES
const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World");
        res.end();
    }
    if (req.url === "/api/courses") {
        res.write(JSON.stringify({id: 1, name: "Webtech2", students: 11}))
        res.end();
    }
});


server.listen(8080);
console.log("Listening on port 8080...");

------------------------------------------------------------------------------------------------------------
https://www.youtube.com/watch?v=TlB_eWDSMt4
------------------------------------------------------------------------------------------------------------
