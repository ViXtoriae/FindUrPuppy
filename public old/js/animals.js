//Menu Hamburger
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}

async function loadAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/animals");
    const animals = await response.json();

    const container = document.getElementById("animalList");
    container.innerHTML = "";
    

    animals.forEach(animal => {
      // Vérifie si l'image existe, sinon utilise placeholder
      


      const imageSrc = animal.image && animal.image.trim() !== "" 
        ? `/assets/${animal.image}` 
        : `/assets/placeholder.jpg`;

        console.log("Image pour", animal.name, ":", animal.image);
      console.log("Chemin utilisé :", imageSrc);

      

      const card = document.createElement("div");
      card.className = "animal-card";
      card.innerHTML = `
        <img src="${imageSrc}" alt="${animal.name}" 
            onerror="this.src='/assets/placeholder.jpg'">
        <h3>${animal.name}</h3>
        <p>${animal.sex} - ${animal.type}</p>
      `;



      // Au clic → ouvrir popup
      card.addEventListener("click", () => {
        const modal = document.getElementById("animalModal");
        const details = document.getElementById("modalDetails");

        details.innerHTML = `
          <h2>${animal.name}</h2>
          <img 
            src="${imageSrc}" 
            alt="${animal.name}" 
            style="width:100%;border-radius:8px;"
          >
          <p><strong>Type :</strong> ${animal.type}</p>
          <p><strong>Âge :</strong> ${animal.age} ans</p>
          <p><strong>Sexe :</strong> ${animal.sex}</p>
          <p><strong>Taille :</strong> ${animal.size}</p>
          <p>${animal.description}</p>
        `;
        modal.style.display = "flex";
      });

      container.appendChild(card);
    });

    // Bouton fermer
    document.getElementById("closeModal").addEventListener("click", () => {
      document.getElementById("animalModal").style.display = "none";
    });

    // Fermer si clic en dehors
    window.addEventListener("click", (e) => {
      const modal = document.getElementById("animalModal");
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

  } catch (err) {
    console.error("Erreur lors du chargement :", err);
  }
}

//Filtre
function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const typeFilter = document.getElementById("filterType").value.toLowerCase();
  const sexFilter = document.getElementById("filterSex").value.toLowerCase();

  const cards = document.querySelectorAll(".animal-card");

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const type = card.querySelector("p").textContent.toLowerCase();
    const sex = card.querySelector("p").textContent.toLowerCase();

    let matches = true;

    if (searchValue && !name.includes(searchValue)) {
      matches = false;
    }
    if (typeFilter && !type.includes(typeFilter)) {
      matches = false;
    }
    if (sexFilter && !sex.includes(sexFilter)) {
      matches = false;
    }

    card.style.display = matches ? "block" : "none";
  });
}

//Filtres reset
function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterType").value = "";
  document.getElementById("filterSex").value = "";

  const cards = document.querySelectorAll(".animal-card");
  cards.forEach(card => {
    card.style.display = "block"; // réaffiche toutes les cartes
  });
}

// Recherche bouton entrée
document.getElementById("searchInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    applyFilters();         
  }
});









loadAnimals();
