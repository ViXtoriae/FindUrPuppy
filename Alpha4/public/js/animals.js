async function loadAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/animals");
    const animals = await response.json();
    console.log("Animaux récupérés :", animals); // ← vérifie dans la console

    const container = document.getElementById("animalList");
    container.innerHTML = "";

    animals.forEach(animal => {
      const card = document.createElement("div");
      card.className = "animal-card";
      card.innerHTML = `
        <img src="/assets/${animal.image || 'placeholder.jpg'}" alt="${animal.name}">
        <h2>${animal.name}</h2>
        <p><strong>Type :</strong> ${animal.type}</p>
        <p><strong>Âge :</strong> ${animal.age} ans</p>
        <p><strong>Sexe :</strong> ${animal.sex}</p>
        <p><strong>Taille :</strong> ${animal.size}</p>
        <p>${animal.description}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Erreur lors du chargement :", err);
  }
}

loadAnimals();
