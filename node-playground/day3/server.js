const express = require("express");
const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // allow any localhost/127.0.0.1 dev origin (any port)
  if (origin && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

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

app.post("/signup", (req, res) => {
  const { email, password } = req.body || {};

  const errors = {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    errors.email = "Valid email is required";
  }
  if (!password || typeof password !== "string" || password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Validation failed", errors });
  }

  // simulate created user
  return res.status(201).json({
    message: "User created",
    user: { id: Date.now(), email },
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
