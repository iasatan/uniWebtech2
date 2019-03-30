const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const logger = require('./middleware/logger');

app.use(express.static(path.join(__dirname, "public")));


app.use(logger);
app.use("/api/members", require("./middleware/api/members"));
app.listen(port, () => {
    console.log("Server running on " + port + "....");
});

