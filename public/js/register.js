document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const message = document.getElementById("register-message");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.some(u => u.email === email);

  if (exists) {
    message.textContent = "Cet email est déjà utilisé ❌";
    message.style.color = "red";
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Compte créé avec succès 🎉";
  message.style.color = "green";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
});
