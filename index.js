const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// sağlık kontrolü
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// basit CRUD örneği (in-memory)
let items = [{ id: 1, name: "First item" }];
let nextId = 2;

app.get("/api/items", (req, res) => res.json(items));

app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "not found" });
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  const item = { id: nextId++, name };
  items.push(item);
  res.status(201).json(item);
});

app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const i = items.findIndex(x => x.id === id);
  if (i === -1) return res.status(404).json({ error: "not found" });
  const { name } = req.body;
  items[i] = { ...items[i], name: name ?? items[i].name };
  res.json(items[i]);
});

app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const i = items.findIndex(x => x.id === id);
  if (i === -1) return res.status(404).json({ error: "not found" });
  const removed = items.splice(i, 1)[0];
  res.json(removed);
});

app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
