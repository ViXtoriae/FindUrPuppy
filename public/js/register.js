/*

document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const msg = document.getElementById("register-message");

    msg.style.display = "none";

    // --- VALIDATIONS SIMPLES ---

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return showError("Email invalide.");

    if (password.length < 8) return showError("Min. 8 caractères.");
    if (!/[A-Z]/.test(password)) return showError("1 majuscule requise.");
    if (!/[0-9]/.test(password)) return showError("1 chiffre requis.");

    // --- ENVOI AU BACKEND ---

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) return showError(data.message);

        msg.textContent = data.message;
        msg.style.color = "green";
        msg.style.display = "block";
    });
});

// Animation erreur
function showError(text) {
    const msg = document.getElementById("register-message");
    msg.textContent = text;
    msg.style.display = "block";
    msg.style.color = "red";

    const card = document.querySelector(".auth-card");
    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 300);
}

*/

/ server.js
const express = require("express");
const app = express();
app.use(express.json());

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Exemple de logique basique
  if (!email || !password) {
    return res.json({ success: false, message: "Champs manquants." });
  }

  // Ici tu pourrais enregistrer en BDD
  return res.json({ success: true, message: "Compte créé avec succès 🎉" });
});

app.listen(3000, () => console.log("Serveur lancé sur http://localhost:3000"));