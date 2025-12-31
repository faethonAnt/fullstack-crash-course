const express = require("express");
const app = express();

app.use(express.json());

// 1) Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2) Echo endpoint (για να βλέπεις body/headers)
app.post("/echo", (req, res) => {
  res.json({
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body,
  });
});

// 3) Auth simulation
app.get("/private", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== "Bearer devtoken") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ secret: "you made it" });
});

// 4) Error endpoint (για να δεις 500)
app.get("/boom", (req, res) => {
  throw new Error("Boom!");
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
