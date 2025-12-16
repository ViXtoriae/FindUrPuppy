import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "adoptme"
});
app.use(express.static(path.join(process.cwd(), "public")));
console.log("Connexion MySQL établie !!! ✅");


// Tous les animaux avec infos refuge
app.get("/api/animals", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        animals.id,
        animals.name,
        animals.type,
        animals.age,
        animals.sex,
        animals.size,
        animals.description,
        animals.image,
        animals.refuge_id,
        refuges.name AS refuge_name,
        refuges.city AS refuge_city,
        refuges.address AS refuge_address,
        refuges.phone AS refuge_phone
      FROM animals
      LEFT JOIN refuges ON animals.refuge_id = refuges.id
    `);
    res.json(rows);
  } catch (err) {
    console.error("Erreur /api/animals :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Tous les refuges
app.get("/api/refuges", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM refuges");
    res.json(rows);
  } catch (err) {
    console.error("Erreur /api/refuges :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// Animaux d'un refuge spécifique
app.get("/api/refuges/:id/animals", async (req, res) => {
  try {
    const refugeId = req.params.id;
    const [rows] = await db.query(`
      SELECT 
        animals.id,
        animals.name,
        animals.type,
        animals.age,
        animals.sex,
        animals.size,
        animals.description,
        animals.image
      FROM animals
      WHERE animals.refuge_id = ?
    `, [refugeId]);
    res.json(rows);
  } catch (err) {
    console.error("Erreur /api/refuges/:id/animals :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// 5 animaux aléatoires avec infos refuge
app.get("/api/animals/random", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        animals.id,
        animals.name,
        animals.type,
        animals.age,
        animals.sex,
        animals.size,
        animals.description,
        animals.image,
        animals.refuge_id,
        refuges.name AS refuge_name,
        refuges.city AS refuge_city,
        refuges.address AS refuge_address,
        refuges.phone AS refuge_phone
      FROM animals
      LEFT JOIN refuges ON animals.refuge_id = refuges.id
      ORDER BY RAND()
      LIMIT 5
    `);
    res.json(rows);
  } catch (err) {
    console.error("Erreur /api/animals/random :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// Tous les utilisateurs
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, username, email, created_at FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Erreur /api/users :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// =============================
// LANCEMENT DU SERVEUR
// =============================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}/html/index.html`);
});
