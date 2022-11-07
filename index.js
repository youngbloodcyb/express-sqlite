const express = require('express');

const app = express();
const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});