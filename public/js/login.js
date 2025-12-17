document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");
  const msg = document.getElementById("error-message");
  const sessionEmail = localStorage.getItem("session");

  // Si déjà connecté
  if (sessionEmail) {
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline";
    msg.textContent = `Vous êtes déjà connecté en tant que ${sessionEmail} ✅`;
    msg.style.color = "green";
    msg.style.display = "block";
  } else {
    loginLink.style.display = "inline";
    logoutBtn.style.display = "none";
  }

  // Déconnexion
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.reload(); // revient sur login.html avec formulaire
  });

  // Connexion
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("session", email);
      msg.textContent = `Connexion réussie ✅ Vous êtes connecté en tant que ${email}`;
      msg.style.color = "green";
      msg.style.display = "block";
      loginLink.style.display = "none";
      logoutBtn.style.display = "inline";
    } else {
      msg.textContent = "Identifiants incorrects ❌";
      msg.style.color = "red";
      msg.style.display = "block";
    }
  });

  // Mot de passe oublié via EmailJS
  document.getElementById("forgot-link").addEventListener("click", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    if (!email) { alert("Veuillez entrer votre email"); return; }
    emailjs.send("service_yxvf2ib", "template_296qy0z", {to_email: email})
      .then(()=> alert("Email de réinitialisation envoyé à " + email))
      .catch(()=> alert("Erreur lors de l’envoi"));
  });
});
