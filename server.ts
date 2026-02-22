import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("opinions.db");

// NOTE: Opinions are permanent and do NOT have a time limit. 
// They stay public until explicitly deleted by the owner.

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    profession TEXT,
    age_group TEXT,
    education_level TEXT,
    ancestry TEXT,
    ethnicity TEXT,
    iq INTEGER DEFAULT 100,
    credits INTEGER DEFAULT 5,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS opinions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    content TEXT,
    keywords TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    opinion_id TEXT,
    voter_id TEXT,
    score INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(opinion_id, voter_id)
  );
`);

// Migration: Add education_level if it doesn't exist
try {
  db.prepare("ALTER TABLE users ADD COLUMN education_level TEXT").run();
} catch (e) {}

// Migration: Add ancestry if it doesn't exist
try {
  db.prepare("ALTER TABLE users ADD COLUMN ancestry TEXT").run();
} catch (e) {}

// Migration: Add email and password if they don't exist
try {
  db.prepare("ALTER TABLE users ADD COLUMN email TEXT").run();
} catch (e) {}
try {
  db.prepare("ALTER TABLE users ADD COLUMN password TEXT").run();
} catch (e) {}

// Migration: Add ethnicity if it doesn't exist
try {
  db.prepare("ALTER TABLE users ADD COLUMN ethnicity TEXT").run();
} catch (e) {}

// Migration: Add username if it doesn't exist
try {
  db.prepare("ALTER TABLE users ADD COLUMN username TEXT").run();
} catch (e) {}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Register
  app.post("/api/auth/register", (req, res) => {
    const { username, email, password, profession, age_group, education_level, ancestry, ethnicity, iq } = req.body;
    const id = Math.random().toString(36).substring(2, 15);
    
    try {
      db.prepare("INSERT INTO users (id, username, email, password, profession, age_group, education_level, ancestry, ethnicity, iq) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run(id, username, email, password, profession, age_group, education_level, ancestry, ethnicity, iq === undefined ? 100 : iq);
      
      const newUser = db.prepare("SELECT id, username, email, profession, age_group, education_level, ancestry, ethnicity, iq, credits FROM users WHERE id = ?").get(id);
      res.json(newUser);
    } catch (e: any) {
      if (e.message.includes('UNIQUE constraint failed: users.email')) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (e.message.includes('UNIQUE constraint failed: users.username')) {
        return res.status(400).json({ error: "Username already exists" });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Login
  app.post("/api/auth/login", (req, res) => {
    const { identifier, password } = req.body;
    const user = db.prepare("SELECT id, username, email, profession, age_group, education_level, ancestry, ethnicity, iq, credits FROM users WHERE (email = ? OR username = ?) AND password = ?").get(identifier, identifier, password);
    
    if (!user) {
      return res.status(401).json({ error: "Invalid username/email or password" });
    }
    
    res.json(user);
  });

  app.get("/api/user/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    // Calculate user score
    const scoreData = db.prepare(`
      SELECT AVG(r.score) as avg_score 
      FROM opinions o 
      JOIN ratings r ON o.id = r.opinion_id 
      WHERE o.user_id = ?
    `).get(req.params.id);
    
    res.json({ ...user, score: scoreData.avg_score || 0 });
  });

  app.put("/api/user/:id", (req, res) => {
    const { profession, age_group, education_level, ancestry, ethnicity, iq } = req.body;
    const userId = req.params.id;

    try {
      db.prepare(`
        UPDATE users 
        SET profession = ?, age_group = ?, education_level = ?, ancestry = ?, ethnicity = ?, iq = ? 
        WHERE id = ?
      `).run(profession, age_group, education_level, ancestry, ethnicity, iq, userId);
      
      const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
      res.json(updatedUser);
    } catch (e) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.get("/api/user/:id/opinions", (req, res) => {
    const userId = req.params.id;
    const opinions = db.prepare(`
      SELECT 
        o.*, 
        COALESCE(AVG(r.score), 0) as opinion_score
      FROM opinions o
      LEFT JOIN ratings r ON o.id = r.opinion_id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `).all(userId);
    res.json(opinions);
  });

  // Post Opinion
  app.post("/api/opinions", (req, res) => {
    const { id, userId, content, keywords } = req.body;
    
    const user = db.prepare("SELECT credits FROM users WHERE id = ?").get(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    db.transaction(() => {
      db.prepare("INSERT INTO opinions (id, user_id, content, keywords) VALUES (?, ?, ?, ?)")
        .run(id, userId, content, keywords.join(","));
      db.prepare("UPDATE users SET credits = credits + 1 WHERE id = ?").run(userId);
    })();

    res.json({ success: true });
  });

  // Search Opinions
  app.get("/api/opinions/search", (req, res) => {
    const { sortBy, ageGroup, profession, educationLevel, ancestry, ethnicity, query } = req.query;
    
    let sql = `
      SELECT 
        o.id, 
        o.user_id,
        o.keywords,
        u.profession,
        u.age_group,
        u.education_level,
        u.ancestry,
        u.ethnicity,
        u.iq as user_iq,
        COALESCE(AVG(r.score), 0) as opinion_score,
        (SELECT COALESCE(AVG(r2.score), 0) FROM opinions o2 JOIN ratings r2 ON o2.id = r2.opinion_id WHERE o2.user_id = o.user_id) as user_score
      FROM opinions o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN ratings r ON o.id = r.opinion_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (ageGroup) {
      sql += " AND u.age_group = ?";
      params.push(ageGroup);
    }

    if (educationLevel) {
      const eds = (educationLevel as string).split(',').filter(e => e.trim() !== '');
      if (eds.length > 0) {
        sql += ` AND u.education_level IN (${eds.map(() => '?').join(',')})`;
        params.push(...eds);
      }
    }

    if (ancestry) {
      const ancs = (ancestry as string).split(',').filter(a => a.trim() !== '');
      if (ancs.length > 0) {
        sql += ` AND u.ancestry IN (${ancs.map(() => '?').join(',')})`;
        params.push(...ancs);
      }
    }

    if (ethnicity) {
      const eths = (ethnicity as string).split(',').filter(e => e.trim() !== '');
      if (eths.length > 0) {
        sql += ` AND u.ethnicity IN (${eths.map(() => '?').join(',')})`;
        params.push(...eths);
      }
    }

    if (profession) {
      const profs = (profession as string).split(',').filter(p => p.trim() !== '');
      if (profs.length > 0) {
        sql += ` AND u.profession IN (${profs.map(() => '?').join(',')})`;
        params.push(...profs);
      }
    }

    if (query) {
      sql += " AND (o.keywords LIKE ? OR o.content LIKE ?)";
      params.push(`%${query}%`, `%${query}%`);
    }

    sql += " GROUP BY o.id";

    if (sortBy === "highest_opinion") {
      sql += " ORDER BY opinion_score DESC";
    } else if (sortBy === "highest_user") {
      sql += " ORDER BY user_score DESC";
    } else if (sortBy === "highest_iq") {
      sql += " ORDER BY u.iq DESC";
    } else {
      sql += " ORDER BY o.created_at DESC";
    }

    const results = db.prepare(sql).all(...params);
    res.json(results);
  });

  // View Opinion (Costs 1 credit)
  app.post("/api/opinions/:id/view", (req, res) => {
    const { userId } = req.body;
    const opinionId = req.params.id;

    const user = db.prepare("SELECT credits FROM users WHERE id = ?").get(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.credits < 1) return res.status(403).json({ error: "Insufficient credits" });

    const opinion = db.prepare(`
      SELECT o.*, u.profession, u.age_group, u.education_level, u.ancestry, u.iq 
      FROM opinions o 
      JOIN users u ON o.user_id = u.id 
      WHERE o.id = ?
    `).get(opinionId);

    if (!opinion) return res.status(404).json({ error: "Opinion not found" });

    // Check if already viewed/rated? The prompt says "Each opinion you post you get 1 credit to look at another persons opinion".
    // It doesn't explicitly say you can't look at the same one twice, but usually viewing costs.
    db.prepare("UPDATE users SET credits = credits - 1 WHERE id = ?").run(userId);

    res.json(opinion);
  });

  // Rate Opinion
  app.post("/api/opinions/:id/rate", (req, res) => {
    const { userId, score } = req.body;
    const opinionId = req.params.id;

    try {
      db.prepare("INSERT OR REPLACE INTO ratings (opinion_id, voter_id, score) VALUES (?, ?, ?)")
        .run(opinionId, userId, score);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Failed to rate" });
    }
  });

  // Delete Opinion
  app.delete("/api/opinions/:id", (req, res) => {
    const { userId } = req.body;
    const opinionId = req.params.id;

    const opinion = db.prepare("SELECT user_id FROM opinions WHERE id = ?").get(opinionId);
    if (!opinion) return res.status(404).json({ error: "Opinion not found" });
    if (opinion.user_id !== userId) return res.status(403).json({ error: "Unauthorized" });

    db.prepare("DELETE FROM ratings WHERE opinion_id = ?").run(opinionId);
    db.prepare("DELETE FROM opinions WHERE id = ?").run(opinionId);

    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
