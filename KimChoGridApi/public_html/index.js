const express = require('express');
const app = express();
const port = 8081;

app.use(express.static('.'));

app.listen(port, () => { console.log("Server Listening on port 8081"); });
