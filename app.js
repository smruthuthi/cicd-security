const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Simple endpoint
app.get("/", (req, res) => {
  res.send("Hello, Kubernetes + CodeQL + Lint 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
