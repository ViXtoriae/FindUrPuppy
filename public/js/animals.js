// Gestion de l'affichage des animaux, des filtres et des modales

// Menu Hamburger
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}

// Chargement des animaux depuis l'API
async function loadAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/animals");
    let animals = await response.json();

    animals = animals.sort(() => Math.random() - 0.5);

    const container = document.getElementById("animalList");
    container.innerHTML = "";
    
    // Création des animal cards
    animals.forEach(animal => {
      const imageSrc = (animal.image && animal.image.trim() !== "")
        ? `/assets/${animal.image}`
        : `/assets/placeholder.jpg`;

      const card = document.createElement("div");
      card.className = "animal-card";
      card.innerHTML = `
        <img src="${imageSrc}" alt="${animal.name}" 
             onerror="this.src='/assets/placeholder.jpg'">
        <h3>${animal.name}</h3>
        <p class="animal-sex">${animal.sex}</p>
        <p class="animal-type">${animal.type}</p>
        <p class="animal-refuge">${animal.refuge_name || "Inconnu"}</p>
      `;

      // Au clic -> ouvrir popup
      card.addEventListener("click", () => {
        const modal = document.getElementById("animalModal");
        const image = document.getElementById("animalImage");
        const details = document.getElementById("modalDetails");

        // Vérification image
        const modalImageSrc = (animal.image && animal.image.trim() !== "")
          ? `/assets/${animal.image}`
          : `/assets/placeholder.jpg`;

        // Afficher l'image
        image.src = modalImageSrc;
        image.alt = animal.name;
        image.onerror = () => { image.src = "/assets/placeholder.jpg"; };

        // Pop-up details
        details.innerHTML = `
          <h2>${animal.name}</h2>
          <p><strong>Type :</strong> ${animal.type}</p>
          <p><strong>Âge :</strong> ${animal.age} ans</p>
          <p><strong>Sexe :</strong> ${animal.sex}</p>
          <p><strong>Taille :</strong> ${animal.size}</p><br>
          <p>${animal.description}</p><br>
          <p><strong>Refuge actuel :</strong> ${animal.refuge_name || "Inconnu"}</p>
          <p><strong>Téléphone :</strong> ${animal.refuge_phone || "Non disponible"}</p>
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

    // Recherche depuis index.html
    const { search, type, sex, refuge } = getQueryParams();
    document.getElementById("searchInput").value = search; 
    document.getElementById("filterType").value = type; 
    document.getElementById("filterSex").value = sex; 
    document.getElementById("filterRefuge").value = refuge;
    applyFilters();
  } catch (err) {
    console.error("Erreur lors du chargement :", err);
  }
}

// Récupération des paramètres depuis index.html
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") || "",
    type: params.get("type") || "",
    sex: params.get("sex") || "",
    refuge: params.get("refuge") || ""
  };
}

// Application des filtres
function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const typeFilter = document.getElementById("filterType").value.toLowerCase();
  const sexFilter = document.getElementById("filterSex").value.toLowerCase();
  const refugeFilter = document.getElementById("filterRefuge").value.toLowerCase();

  const cards = document.querySelectorAll(".animal-card");

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const type = card.querySelector(".animal-type").textContent.toLowerCase();
    const sex = card.querySelector(".animal-sex").textContent.toLowerCase();
    const refuge = card.querySelector(".animal-refuge").textContent.toLowerCase();

    let matches = true;

    if (searchValue && !name.includes(searchValue)) matches = false;
    if (typeFilter && type !== typeFilter) matches = false;
    if (sexFilter && sex !== sexFilter) matches = false;
    if (refugeFilter && refuge !== refugeFilter) matches = false;

    card.style.display = matches ? "block" : "none";
  });
}

// Reset des filtres
function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterType").value = "";
  document.getElementById("filterSex").value = "";
  document.getElementById("filterRefuge").value = "";

  const cards = document.querySelectorAll(".animal-card");
  cards.forEach(card => { card.style.display = "block"; });
}

// Application des filtres au Enter
document.getElementById("searchInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    applyFilters();         
  }
});

// Redirection vers animal.html avec filtres
function goToAnimals() {
  const search = document.getElementById("searchInput").value;
  const type = document.getElementById("filterType").value;
  const sex = document.getElementById("filterSex").value;
  const refuge = document.getElementById("filterRefuge").value;

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (type) params.append("type", type);
  if (sex) params.append("sex", sex);
  if (refuge) params.append("refuge", refuge);

  window.location.href = "animal.html?" + params.toString();
}

// Lancement
loadAnimals();
