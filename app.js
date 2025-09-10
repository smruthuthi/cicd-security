const express = require('express');
const app = express();
const port = 3000;

// Vulnerable: eval on user-controlled query param
app.get('/calc', (req, res) => {
  const input = req.query.expr; // attacker-controlled
  try {
    const result = eval(input); // ❌ dangerous
    res.send(`Result: ${result}`);
  } catch (err) {
    res.status(400).send('Invalid expression');
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
