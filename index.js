const express = require('express');
require('dotenv').config();
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const { PORT } = process.env;

const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

const sql_create = `CREATE TABLE IF NOT EXISTS Books (
    Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(100) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Comments TEXT
);`;
  
db.run(sql_create, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Books' table");
});

console.log("Successful creation of the 'Books' table");
// Database seeding
const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
(1, 'Test 1', 'Cam', 'First in the series'),
(2, 'Test 2', 'Alani', 'Second in the series'),
(3, 'Test 3', 'Auston', 'Third in the series');`;

db.run(sql_insert, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of 3 books");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
  });

app.get("/data", (req, res) => {
    const test = {
        title: "Test",
        items: ["one", "two", "three"]
    };
    res.render("data", { model: test });
});

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM Books ORDER BY Title"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("books", { model: rows });
    });
  });

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server running on ${PORT}`);
});