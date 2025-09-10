const express = require("express");
const app = express();
const port = 3000;

// 🚨 Vulnerable: Directly using user input in eval() - CodeQL will flag this
app.get("/eval", (req, res) => {
  const userInput = req.query.input;
  try {
    const result = eval(userInput); // ❌ Code injection vulnerability
    res.send(`Result: ${result}`);
  } catch (e) {
    res.status(500).send("Error in execution");
  }
});

app.get("/", (req, res) => {
  res.send("Hello from vulnerable Node.js app! Try /eval?input=2+2");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
