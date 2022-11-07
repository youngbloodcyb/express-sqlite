const express = require('express');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server running on ${PORT}`);
});