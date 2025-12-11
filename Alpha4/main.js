/* ==============================
   MENU HAMBURGER (Commun)
============================== */
const hamburger = document.querySelector('.hamburger');
const navRight = document.querySelector('.nav-right');
if (hamburger && navRight) {
  hamburger.addEventListener('click', () => {
    navRight.classList.toggle('active');
  });
}

/* ==============================
   PAGE ADOPTION (adopt.html)
============================== */
const animalCard = document.getElementById("animal-card");
const nameEl = document.getElementById("animal-name");
const descEl = document.getElementById("animal-desc");
const imgEl = document.getElementById("animal-img");
const resultEl = document.getElementById("result");
const likeBtn = document.getElementById("like");
const nopeBtn = document.getElementById("nope");
const filterBtn = document.getElementById("filter-btn");

if (animalCard && nameEl && descEl && imgEl && resultEl) {
  let adoptAnimals = [];
  let index = 0;
  let adopted = [];

  // Charger les animaux
  fetch('animalData.txt')
    .then(r => r.text())
    .then(text => {
      adoptAnimals = JSON.parse(text);

      // Appliquer filtres depuis localStorage
      const filters = JSON.parse(localStorage.getItem("animalFilters") || "{}");
      adoptAnimals = adoptAnimals.filter(a =>
        (!filters.type || a.type === filters.type) &&
        (!filters.sex || a.sex === filters.sex) &&
        (!filters.age || a.age === filters.age) &&
        (!filters.size || a.size === filters.size)
      );
      showAnimal();
    })
    .catch(err => console.error("Erreur lecture animalData.txt :", err));

  function showAnimal() {
    if (!adoptAnimals.length || index >= adoptAnimals.length) { showResult(); return; }
    const a = adoptAnimals[index];
    nameEl.textContent = a.name;
    descEl.textContent = a.desc;
    imgEl.src = a.img;
  }

  function showResult() {
    animalCard.style.display = "none";
    if (likeBtn) likeBtn.style.display = "none";
    if (nopeBtn) nopeBtn.style.display = "none";
    resultEl.innerHTML = `<h2>Animaux adoptés 🐾</h2>
      <ul>${adopted.map(a => `<li>${a.name}</li>`).join('')}</ul>
      <a href="index.html">⬅ Revenir à l’accueil</a>`;
  }

  if (likeBtn) likeBtn.addEventListener("click", () => {
    adopted.push(adoptAnimals[index]);
    index++;
    showAnimal();
  });

  if (nopeBtn) nopeBtn.addEventListener("click", () => {
    index++;
    showAnimal();
  });

  // Filtre type d'animaux
  const typeSelect = document.getElementById('filter-type');
  if (typeSelect) {
    fetch('animalType.json')
      .then(r => r.json())
      .then(data => {
        data.types.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t.charAt(0).toUpperCase() + t.slice(1);
          typeSelect.appendChild(opt);
        });
      });
  }

  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const type = document.getElementById("filter-type").value;
      const sex = document.getElementById("filter-sex").value;
      const age = document.getElementById("filter-age").value;
      const size = document.getElementById("filter-size").value;
      localStorage.setItem("animalFilters", JSON.stringify({ type, sex, age, size }));
      window.location.href = "adopt.html";
    });
  }
}

/* ==============================
   TINDER-LIKE (index.html)
============================== */
const cardsContainer = document.getElementById("cards-container");
const likedList = document.getElementById("liked-list");

if (cardsContainer && likedList) {
  const animals = [
    { name: "Gemal", type: "chien", img: "assets/Gemal.jpg" },
    { name: "Luna", type: "chat", img: "assets/luna.jpg" }
  ];
  let current = 0;
  const likeBtn = document.getElementById("like");
  const nopeBtn = document.getElementById("nope");

  function showCard(index) {
    if (index >= animals.length) {
      cardsContainer.innerHTML = "<p>Plus d'animaux à afficher</p>";
      return;
    }
    const a = animals[index];
    cardsContainer.innerHTML = `<div class="card">
      <img src="${a.img}" alt="${a.name}">
      <h4>${a.name}</h4>
    </div>`;
  }

  showCard(current);

  if (likeBtn) likeBtn.addEventListener("click", () => {
    likedList.innerHTML += `<li>${animals[current].name}</li>`;
    current++;
    showCard(current);
  });

  if (nopeBtn) nopeBtn.addEventListener("click", () => {
    current++;
    showCard(current);
  });
}

/* ==============================
   FIRESTORE AVIS (index.html)
============================== */
const reviewsContainer = document.getElementById("reviews-container");
if (reviewsContainer) {
  const firebaseConfig = {
    // Ton config Firestore ici
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  db.collection("avis").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "client__card";
      div.innerHTML = `<div class="client__details">
        <img src="${data.avatar}" alt="${data.name}">
        <h4>${data.name}</h4>
        <h5>${data.date}</h5>
      </div>
      <p>${data.comment}</p>`;
      reviewsContainer.appendChild(div);
    });
  });
}
