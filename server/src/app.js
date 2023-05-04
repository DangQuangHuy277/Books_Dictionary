require('dotenv').config();
const express = require("express");
const app = express();
const router = require('./router');

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';

app.use('/', router);

app.listen(port, host, () => {
    console.log(`The server is running on http://localhost:${port}`);
})

