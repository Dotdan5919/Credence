import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("submissions.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
      const stmt = db.prepare(
        "INSERT INTO contact_submissions (name, email, subject, message) VALUES (?, ?, ?, ?)"
      );
      stmt.run(name, email, subject, message);
      res.json({ success: true, message: "Submission saved to database (Excel-compatible)" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to save submission" });
    }
  });

  // Export to CSV (Excel compatible)
  app.get("/api/export", (req, res) => {
    try {
      const rows = db.prepare("SELECT * FROM contact_submissions").all();
      if (rows.length === 0) {
        return res.status(404).send("No data to export");
      }

      const headers = Object.keys(rows[0]).join(",");
      const csv = rows.map(row => Object.values(row).map(v => `"${v}"`).join(",")).join("\n");
      
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=submissions.csv");
      res.status(200).send(`${headers}\n${csv}`);
    } catch (error) {
      res.status(500).send("Export failed");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
