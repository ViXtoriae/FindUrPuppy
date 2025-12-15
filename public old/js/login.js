document.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("user.email");
  const savedPassword = localStorage.getItem("user.password");

  if (savedEmail && savedPassword) {
    document.getElementById("login-email").value = savedEmail;
    document.getElementById("login-password").value = savedPassword;
  }
});

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const savedEmail = localStorage.getItem("user.email");
  const savedPassword = localStorage.getItem("user.password");

  const msg = document.getElementById("login-message");
  if (email === savedEmail && password === savedPassword) {
    msg.textContent = "Connexion réussie ✅";
    msg.style.color = "green";
  } else {
    msg.textContent = "Identifiants incorrects ❌";
    msg.style.color = "red";
  }
});