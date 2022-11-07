const express = require('express');
require('dotenv').config();
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const { PORT } = process.env;

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
  });

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server running on ${PORT}`);
});