// Gestion de l'affichage des animaux, des filtres et des modales

//Menu Hamburger
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}

// Chargement des animaux depuis l'API
async function loadAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/animals");
    const animals = await response.json();

    const container = document.getElementById("animalList");
    container.innerHTML = "";
    
    // Création des cartes animaux
    animals.forEach(animal => {
      const imageSrc = animal.image && animal.image.trim() !== "" 
        ? `/assets/${animal.image}` 
        : `/assets/placeholder.jpg`;

        console.log("Image pour", animal.name, ":", animal.image);
      console.log("Chemin utilisé :", imageSrc);

      

      const card = document.createElement("div");
      card.className = "animal-card";
      // Contenu de la carte
      card.innerHTML = `
        <img src="${imageSrc}" alt="${animal.name}" onerror="this.src='/assets/placeholder.jpg'">
        <h3>${animal.name}</h3>
        <p class="animal-sex">${animal.sex}</p>
        <p class="animal-type">${animal.type}</p>
        <p class="animal-refuge">${animal.refuge_name || "Inconnu"}</p>
      `;


      // Au clic -> ouvrir popup
      card.addEventListener("click", () => {
        const modal = document.getElementById("animalModal");
        const details = document.getElementById("modalDetails");

      details.innerHTML = `
        <div class="animal-modal-content">
          <div class="animal-modal-left">
            <img 
              src="${imageSrc}" 
              alt="${animal.name}" 
              class="animal-modal-img"
            >
          </div>
          <div class="animal-modal-right">
            <h2>${animal.name}</h2>
            <p><strong>Type :</strong> ${animal.type}</p>
            <p><strong>Âge :</strong> ${animal.age} ans</p>
            <p><strong>Sexe :</strong> ${animal.sex}</p>
            <p><strong>Taille :</strong> ${animal.size}</p><br>
            <p>${animal.description}</p>
            </br>
            <p><strong>Refuge actuel :</strong> ${animal.refuge_name || "Inconnu"}</p>
            <p><strong>Téléphone :</strong> ${animal.refuge_phone || "Non disponible"}</p>
          </div>
        </div>
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

//Recup depuis index
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") || "",
    type: params.get("type") || "",
    sex: params.get("sex") || "",
    refuge: params.get("refuge") || ""
  };
}


//Filtre
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

    if (searchValue && !name.includes(searchValue)) {
      matches = false;
    }
    if (typeFilter && type !== typeFilter) {
      matches = false;
    }
    if (sexFilter && sex !== sexFilter) {
      matches = false;
    }
    if (refugeFilter && refuge !== refugeFilter) {
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
  document.getElementById("filterRefuge").value = "";

  const cards = document.querySelectorAll(".animal-card");
  cards.forEach(card => {
    card.style.display = "block";
  });
}

// Recherche bouton entrée
document.getElementById("searchInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    applyFilters();         
  }
});

//Redirige
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

loadAnimals();
