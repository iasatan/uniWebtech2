const express = require("express");
const cors = require("cors");
const app = express();
const posts = require("./api/posts");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/posts", posts);


app.listen(port, () => {
    console.log("Server started on " + port);
});

