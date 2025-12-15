
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simule une base de données
let users = [];

// Route inscription 
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Vérification champs
  if (!email || !password) {
    return res.json({ success: false, message: "Champs manquants." });
  }

  // Vérifie si email déjà utilisé
  if (users.some(u => u.email === email)) {
    return res.json({ success: false, message: "Email déjà utilisé." });
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Stockage utilisateur
  users.push({
    email,
    password: hashedPassword,
    createdAt: new Date()
  });

  return res.json({ success: true, message: "Compte créé avec succès 🎉" });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur API en ligne sur http://localhost:${PORT}`);
});
