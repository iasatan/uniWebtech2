const express = require("express");
const path = require("path");
const app = express();


app.use(express.static(path.join(__dirname, 'todoapp', 'dist')));

app.listen(8080, () => console.log("Server running on 8080..."));