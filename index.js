const express = require("express");
const app = express();

// ÖDEV: 8000 portu
const PORT = 8000;

app.use(express.json());

// ---- ÖDEV ENDPOINTİ ----
// GET /hello?name=Salih
app.get("/hello", (req, res) => {
  const name = req.query.name || "Salih Akis"; // Postman'de name vermezsen default
  res.json({ message: `Hello, ${name}!` });
});

// POST /hello  Body: { "name": "Salih Akış" }
app.post("/hello", (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  res.json({ message: `Hello, ${name}!` });
});
// ---- /ÖDEV ENDPOINTİ ----

// (Diğer örnek endpointlerin kalsın istersen)
// app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
