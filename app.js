const express = require("express");
const app = express();
const port = 3000;

// Vulnerable: eval on user-controlled query param
app.get("/calc", (req, res) => {
  const input = req.query.expr; // attacker-controlled
  try {
    const result = eval(input); // ❌ dangerous
    res.send(`Result: ${result}`);
  } catch (err) {
    res.status(400).send("Invalid expression");
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

// --- Additional vulnerabilities for CodeQL demonstration ---
const mysql = require("mysql");
const { exec } = require("child_process");

// Vulnerable: SQL Injection
app.get("/user", (req, res) => {
  const username = req.query.username; // attacker-controlled
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "testdb",
  });
  connection.connect();
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.json(results);
    }
  });
  connection.end();
});

// Vulnerable: Command Injection
app.get("/ping", (req, res) => {
  const host = req.query.host; // attacker-controlled
  exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send("Ping failed");
    } else {
      res.send(`<pre>${stdout}</pre>`);
    }
  });
});

// Vulnerable: Insecure Deserialization
app.get("/deserialize", (req, res) => {
  const data = req.query.data; // attacker-controlled
  try {
    const obj = eval("(" + data + ")"); // ❌ dangerous
    res.json(obj);
  } catch (e) {
    res.status(400).send("Invalid data");
  }
});
