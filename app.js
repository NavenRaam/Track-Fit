const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trackfit",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Handle signup request
app.post("/", (req, res) => {
  const { email, password } = req.body;
  const sql = `INSERT INTO login (email, password) VALUES (?, ?)`;
  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;
    res.send("User registered successfully");
  });
});

// Handle signin request
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM login WHERE email = ? AND password = ?`;
  db.query(sql, [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send("Sign in successful");
    } else {
      res.send("Invalid email or password");
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
