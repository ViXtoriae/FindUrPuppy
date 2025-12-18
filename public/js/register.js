console.log("register.js chargé");
// Gérer le formulaire d'inscription
document.getElementById("register-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const message = document.getElementById("register-message");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Vérifie si l'email existe déjà
  const exists = users.some(u => u.email === email);

  if (exists) {
    message.textContent = "Cet email est déjà utilisé";
    message.className = "error-msg";
    message.style.display = "block";
    return;
  }

  // Création du compte
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Compte créé avec succès 🎉";
  message.className = "success-msg";
  message.style.display = "block";

  // Redirection automatique vers login
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
document.getElementById("register-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const message = document.getElementById("register-message");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Vérifie si l'email existe déjà
  const exists = users.some(u => u.email === email);

  if (exists) {
    message.textContent = "Cet email est déjà utilisé";
    message.className = "error-msg";
    message.style.display = "block";
    return;
  }

  // Création du compte
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Compte créé avec succès 🎉";
  message.className = "success-msg";
  message.style.display = "block";

  // Redirection automatique vers login
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
