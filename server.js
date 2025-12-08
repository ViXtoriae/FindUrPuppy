import express from "express";
import mysql from "mysql2/promise";

const app = express();
const PORT = 3000;

// Connexion MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "adoptme"
});

// Route pour récupérer les animaux
app.get("/api/animals", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM animals");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour récupérer les refuges
app.get("/api/refuges", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM refuges");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});
app.use(express.static("public"));
import cors from "cors";
app.use(cors());

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
