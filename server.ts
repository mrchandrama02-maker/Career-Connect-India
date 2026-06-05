import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Baseline types
interface User {
  id: string;
  email: string;
  role: string;
  name: string;
  blocked?: boolean;
}

const app = express();
const PORT = 3000;
const DB_PATH = path.join(process.cwd(), "src", "data", "server_db.json");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Key-value store cache
let serverDb: Record<string, any> = {};

// Load baseline database
function loadDatabase() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf8");
      serverDb = JSON.parse(data);
      console.log("[CI Server DB] Loaded database from file with", Object.keys(serverDb).length, "keys.");
    } else {
      console.log("[CI Server DB] Database file not found. Initializing cache...");
      serverDb = {};
    }
  } catch (error) {
    console.error("[CI Server DB] Failed to load database, starting fresh.", error);
    serverDb = {};
  }
}

// Persist cache
function saveDatabase() {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(serverDb, null, 2), "utf8");
  } catch (error) {
    console.error("[CI Server DB] Failed to persist database:", error);
  }
}

loadDatabase();

// API Store GET
app.get("/api/store/:key", (req, res) => {
  const { key } = req.params;
  const value = serverDb[key];
  if (value === undefined) {
    return res.json({ status: "not_found", value: null });
  }
  return res.json({ status: "success", value });
});

// API Store POST
app.post("/api/store/:key", (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  
  serverDb[key] = value;
  saveDatabase();
  
  return res.json({ status: "success" });
});

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    console.log("[CI Server] Initializing Vite middleware for active developer workspace...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Explicit route for admin.html page
    app.get("/admin", (req, res) => {
      res.sendFile(path.join(distPath, "admin.html"));
    });
    app.get("/admin.html", (req, res) => {
      res.sendFile(path.join(distPath, "admin.html"));
    });

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CI Server] Full-stack engine running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
