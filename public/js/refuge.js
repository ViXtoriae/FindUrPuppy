async function loadRefuges() {
  const response = await fetch("http://localhost:3000/api/refuges");
  const refuges = await response.json();

  const list = document.getElementById("refugeList");
  list.innerHTML = "";

  refuges.forEach(refuge => {
    const card = document.createElement("div");
    card.className = "refuge-card";

    card.innerHTML = `
      <h3>${refuge.name}</h3>
      <p><strong>Ville :</strong> ${refuge.city}</p>
      <p><strong>Adresse :</strong> ${refuge.address}</p>
      <p><strong>Téléphone :</strong> ${refuge.phone}</p>
    `;

    card.addEventListener("click", () => showRefugeModal(refuge));
    list.appendChild(card);
  });
}

async function showRefugeModal(refuge) {
  const modal = document.getElementById("refugeModal");
  const details = document.getElementById("refugeDetails");
  const animalsDiv = document.getElementById("refugeAnimals");
  const imageBox = document.getElementById("refugeImage");

  details.innerHTML = `
    <h2>${refuge.name}</h2>
    <p><strong>Ville :</strong> ${refuge.city}</p>
    <p><strong>Adresse :</strong> ${refuge.address}</p>
    <p><strong>Téléphone :</strong> ${refuge.phone}</p>
    <br><br>
    <h3>Animaux disponibles :</h3>
  `;

  // Récup les animaux du refuge
  const response = await fetch(`http://localhost:3000/api/refuges/${refuge.id}/animals`);
  const animals = await response.json();

  animalsDiv.innerHTML = animals.length
    ? animals.map(a => `<p>${a.name} (${a.type}, ${a.age} ans)</p>`).join("")
    : "<p>Aucun animal pour le moment.</p>";


  imageBox.innerHTML = `
    <img src="../assets/${refuge.image}" alt="${refuge.name}" style="width:100%; border-radius:10px;">
  `;

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("refugeModal").style.display = "none";
}

window.onload = loadRefuges;

function closeModal() {
  document.getElementById("refugeModal").style.display = "none";
}

window.onload = loadRefuges;
