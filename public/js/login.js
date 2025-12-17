document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("error-message");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("connectedUser", email);

    msg.style.display = "block";
    msg.style.color = "green";
    msg.textContent = "Connexion réussie ✅";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  } else {
    msg.style.display = "block";
    msg.style.color = "red";
    msg.textContent = "Identifiants incorrects ❌";
  }
});
