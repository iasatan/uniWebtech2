fullstack.js

github repo
új webstrom empty projekt
npm init
npm i express cros mongodb
npm i -D nodemon

"scripts": {
    "start": "node server/app.js",
    "dev": "nodemon server/app.js"
  },

server/app.js
------------------------------------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
//midlleware
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log("Server started on " + port);
});
------------------------------------------------------------------------------------------
npm run dev
------------------------------------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const posts = require("./routes/api/posts");
//midlleware
app.use(express.json());
app.use(cors());
app.use("/api/posts", posts);

app.listen(port, () => {
    console.log("Server started on " + port);
});


------------------------------------------------------------------------------------------
const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("hello");
});

module.exports = router;
------------------------------------------------------------------------------------------
mongodb atlas
regisztráció
------------------------------------------------------------------------------------------
const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://student:student@webtech2-yqsds.mongodb.net/test', {useNewUrlParser: true});
    return client.db("webtech2").collection("posts");
}

module.exports = router;
------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find().toArray());
});

böngésző, postman
------------------------------------------------------------------------------------------
router.post("/", async (req, res) => {
    const posts = await loadPostsCollection();
    posts.insertOne({
        text: req.body.text,
        user:req.body.user,
        createdAt: new Date()
    })
    res.status(201).send();
});

postman
működik json nélkül is -> értékellenőrzés optimalizált
router.post("/", async (req, res) => {
    var text = req.body.text;
    var user = req.body.user
    if (text == null || user==null) {
        res.status(400).send();
        return;
    }
    const posts = await loadPostsCollection();
    posts.insertOne({
        text: text,
        user:user,
        createdAt: new Date()
    })
    res.status(201).send();
});
------------------------------------------------------------------------------------------
router.delete("/:id", async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});
------------------------------------------------------------------------------------------
gitignore-ba client és node_modules
vue create client
git add .
git commit -m "initial backend created"
cd client
npm run serve

------------------------------------------------------------------------------------------
helloworld.vue -> PostComponetn.vue
PostService.js az src mappába
import axios from 'axios';

const url = "http://localhost:5000/api/posts/";

class PostService {
    //get
    static getPosts() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const res = await axios.get(url);
                    const data = res.data;
                    resolve(
                        data.map(post => ({
                            ...post,
                            createdAt: new Date(post.createdAt)
                        }))
                    )
                } catch (e) {
                    reject(e);
                }
            }
        );
    }

    //create

    //delete
}
export default PostService;
------------------------------------------------------------------------------------------
    //create
    static insertPost(text, user) {
        return axios.post(url, {text, user})

    }

------------------------------------------------------------------------------------------
    //delete
    static deletePost(id) {
        return axios.delete(url + id);
    }
------------------------------------------------------------------------------------------
<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: 'PostComponent',
        data() {
            return {
                posts: [],
                error: '',
                text: '',
                user: '',
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.container {
        max-width: 800px;
        margin: 0 auto;
    }

    p.error {
        border: 1px solid #ff5b5f;
        background-color: #ffc5c1;
        padding: 10px;
        margin-bottom: 15px;
    }

    div.post {
        position: relative;
        border: 1px solid #5bd658;
        background-color: #bcffb8;
        padding: 10px 10px 30px 10px;
        margin-bottom: 15px;
    }

    div.created-at {
        position: absolute;
        top: 0;
        left: 0;
        padding: 5px 15px 5px 15px;
        background-color: darkgreen;
        color: white;
        font-size: 13px;
    }

    p.text {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }
</style>

------------------------------------------------------------------------------------------
,
        async created() {
            try {
                this.posts = await PostService.getPosts();
            } catch (e) {
                this.error = e.message;
            }
        }
------------------------------------------------------------------------------------------
<template>
    <div class="container">
        <h1>Latest Posts</h1>
        <!--CREATE POST HERE-->
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="container">
            <div class="post"
                 v-for="(post, index) in posts"
                 v-bind:key="post._id"
                 v-bind:item="post"
                 v-bind:index="index"
            >
                {{post.createdAt}}
                <p class="text">{{post.text}}</p>
                {{post.user}}
            </div>
        </div>
    </div>
</template>
//
------------------------------------------------------------------------------------------
<div>
            <label for="create-post">Say something...</label>
            <input type="text" id="create-post" v-model="text" placeholder="Create a post">
            <input type="text" id="username" v-model="user" placeholder="Username">
            <button v-on:click="createPost">Post!</button>
        </div>
        //
------------------------------------------------------------------------------------------
methods: {
            async createPost() {
                await PostService.insertPost(this.text, this.user);
                this.posts = await PostService.getPosts();
            }
        },
------------------------------------------------------------------------------------------
 @dblclick="deletePost(post._id)"

             async deletePost(id) {
                await PostService.deletePost(id);
                this.posts = await PostService.getPosts();
            }
------------------------------------------------------------------------------------------
veu.config.js clientbe

"api/posts" localhost helyett PostService-ben

const path = require("path");

module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:5000"
            }
        }
    },
    outputDir: path.resolve(__dirname, "../server/public")
}
reload server

index.html title
------------------------------------------------------------------------------------------
app.use("/api/posts", posts);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/public"));
    app.get("/.*/", (req, res) => {
            res.sendFile(__dirname + "/public/index.html");
        }
    )
}
------------------------------------------------------------------------------------------
heroku
------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------
