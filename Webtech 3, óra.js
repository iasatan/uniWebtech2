Webtech 3. óra

EXPRESS
gyors, egyszerű web framework
gyorsabb fejleszteni mint a sima http szervert ami múltórán volt
legnépszerűbb node framework
request és response alapú, teljes kontroll

http status kód ha szükséges 

------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send("Hello World");
});

app.listen(8080);

------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get, app.post
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res)=> {
    res.send("<h1>Hello World</h1>");
});

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const members = {id: 1, name: "John Doe", email: "john@doe.com", status: "active"};

app.get('/api/members', (req, res) => {
    res.json(members);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const members = {id: 1, name: "John Doe", email: "john@doe.com", status: "active"};

app.get('/api/members', (req, res) => res.json(members));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const members = {id: 1, name: "John Doe", email: "john@doe.com", status: "active"};

module.exports = members;



const express = require('express');
const path = require('path');
const members = require('./Members');
const app = express();
const port = process.env.PORT || 8080;


app.get('/api/members', (req, res) => res.json(members));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const members = require('./Members');
const moment = require("moment");
const app = express();
const port = process.env.PORT || 8080;

const logger = (req, res, next) => {
    console.log(req.protocol + "://" + req.get('host') + "" + req.originalUrl + ": " + moment().format());
    next();
};

app.use(logger);
app.get('/api/members', (req, res) => res.json(members));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const moment = require("moment");
const logger = (req, res, next) => {
    console.log(req.protocol + "://" + req.get('host') + "" + req.originalUrl + ": " + moment().format());
    next();
};

module.exports = logger;


const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require("./middleware/logger");
const app = express();
const port = process.env.PORT || 8080;


app.use(logger);
app.get('/api/members', (req, res) => res.json(members));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require("./middleware/logger");
const app = express();
const port = process.env.PORT || 8080;


app.use(logger);
app.get('/api/members', (req, res) => res.json(members));
app.get("/api/members/:id", (req, res) => {
    res.send(req.params.id);
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require("./middleware/logger");
const app = express();
const port = process.env.PORT || 8080;


app.use(logger);
app.get('/api/members', (req, res) => res.json(members));
app.get("/api/members/:id", (req, res) => {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server running on ' + port + "..."));
------------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');

const logger = require("./middleware/logger");
const app = express();
const port = process.env.PORT || 8080;


app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));
app.listen(port, () => console.log('Server running on ' + port + "..."));



const express = require('express');
const members = require('../..//Members');
const router = express.Router();

router.get('/', (req, res) => res.json(members));
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: "Member not found with id: " + req.params.id});
    }
});

module.exports = router;

------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post('/', (req, res) => 
    res.send(req.body);
});



app.use(express.json());
app.use(express.urlencoded({extended: false}));
------------------------------------------------------------------------------------------------------------------------------------------------------------
npm i uuid

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: "need name and email"});
    }

    members.push(newMember);
    res.json(members);
});
------------------------------------------------------------------------------------------------------------------------------------------------------------
//updateMember
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({msg: "Member updated", member});
            }
        });
    } else {
        res.status(400).json({msg: "Member not found with id: " + req.params.id});
    }
});
------------------------------------------------------------------------------------------------------------------------------------------------------------
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({msg: "Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: "Member not found with id: " + req.params.id});
    }
})
------------------------------------------------------------------------------------------------------------------------------------------------------------
MONGODB
sudo apt install MONGODB, mongodb-client

mongo localhost
show dbs
use mycostumers
db
show collections
db.createCollection('customer')
db.customer.insert({first_name:"John", last_name:"Doe"});
db.customer.find();
db.customer.insert([{first_name:"Toth", last_name:"Zsolt"}, {first_name:"Big", last_name:"Sword Hero", gender:"Fluid"}]);
db.customer.find().pretty();
db.customer.update({first_name:"John"},{first_name:"John", last_name:"Doe", gender:"male"})
db.customer.update({first_name:"Toth"},{$set:{gender:"male"}})
db.customer.update({first_name:"Toth"},{$set:{age:45}})
db.customer.update({first_name:"Toth"},{$inc:{age:5}} )
db.customer.update({first_name:"Toth"},{$unset:{age:1}})
db.customer.update({first_name:"Mary"}, {first_name:"Mary", last_name:"Samson"})
db.customer.update({first_name:"Mary"}, {first_name:"Mary", last_name:"Samson"},{upsert:true})
db.customer.update({first_name:"John"}, {$rename:{"gender":"sex"}})
db.customer.remove({first_name:"Mary"})
db.customer.find({first_name:"Toth"}).pretty();
db.customer.find({$or:[{first_name:"Toth"}, {first_name:"Big"}]}).pretty();
db.customer.update({},{$set:{age:45}}, false, true) //upsert, multi
db.customer.update({first_name:"Toth"},{$inc:{age:5}} )
db.customer.find({age:{$gt:46}}).pretty()
db.customer.find().count();
db.customer.find({first_name:"Toth"}).count();
db.customer.find().limit(2);



------------------------------------------------------------------------------------------------------------------------------------------------------------
npm i mongodb;

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
    if (err) return console.log(err);
    db = database.db('mycustomers');
    app.listen(port, () => console.log('Server running on ' + port + "..."));
});
app.get("/asd", (req, res) => {
    var cursor = db.collection("customer").find().toArray((err, results) => {
        console.log(results);
    })
});
------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/asd", (req, res) => {
    var cursor = db.collection("customer").find().toArray((err, results) => {
        res.send(results);
    })
});
------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/asd", (req, res) => {
    db.collection("customer").insertOne(req.body);
    console.log("inserted");
    res.redirect("/asd");
});
------------------------------------------------------------------------------------------------------------------------------------------------------------
