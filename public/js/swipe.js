// swipe.js

const container = document.getElementById("cardContainer");
const likesCount = document.getElementById("likesCount");

let history = [];
let likedAnimals = JSON.parse(localStorage.getItem("likedAnimals")) || [];

updateBadge();

// Charger 5 animaux aléatoires depuis la base
async function loadSwipeAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/animals/random");
    const animals = await response.json();

    container.innerHTML = "";

    animals.forEach((animal, index) => {
      const imageSrc = animal.image && animal.image.trim() !== "" 
        ? `/assets/${animal.image}` 
        : `/assets/placeholder.jpg`;

      const card = document.createElement("div");
      card.className = "card";
      card.style.zIndex = index + 1;

      card.innerHTML = `
        <img src="${imageSrc}" class="card-img" alt="${animal.description}">
        <div class="card-content">
          <h3>${animal.name}, ${animal.age} ans</h3>
          <p>${animal.description}</p>
        </div>
      `;

      container.appendChild(card);
    });

    reorganizeCards();
  } catch (err) {
    console.error("Erreur chargement animaux swipe:", err);
  }
}

loadSwipeAnimals();

// … garde tes fonctions swipe(), undoSwipe(), updateBadge(), reorganizeCards() identiques


function swipe(direction) {
  const cards = container.querySelectorAll(".card");
  const activeCard = cards[cards.length - 1];
  if (!activeCard) return;

  const animal = {
    id: activeCard.querySelector("h3").innerText,
    name: activeCard.querySelector("h3").innerText,
    description: activeCard.querySelector("p").innerText,
    image: activeCard.querySelector("img").src
  };

  const alreadyLiked = likedAnimals.some(a => a.id === animal.id);

  history.push({
    element: activeCard.outerHTML,
    animal: animal,
    liked: direction === "right" && !alreadyLiked
  });

  if (direction === "right") {
    if (!alreadyLiked) {
      likedAnimals.push(animal);
      localStorage.setItem("likedAnimals", JSON.stringify(likedAnimals));
      updateBadge();
    }
    activeCard.classList.add("swipe-right");
  } else {
    activeCard.classList.add("swipe-left");
  }

  setTimeout(() => {
    activeCard.remove();
    reorganizeCards();
  }, 500);
}

function undoSwipe() {
  if (history.length === 0) return;

  const last = history.pop();

  if (last.liked) {
    likedAnimals = likedAnimals.filter(a => a.id !== last.animal.id);
    localStorage.setItem("likedAnimals", JSON.stringify(likedAnimals));
    updateBadge();
  }

  container.insertAdjacentHTML("beforeend", last.element);
  reorganizeCards();
}

function updateBadge() {
  if (likesCount) {
    likesCount.textContent = likedAnimals.length;
  }
}

function reorganizeCards() {
  const cards = container.querySelectorAll(".card");

  if (cards.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; margin-top:50%;">
        <h2 style="color:#3f3b57">Plus d'animaux disponibles</h2>
        <a href="likes.html" class="btn-like-list">Voir mes coups de cœur ❤️</a>
      </div>`;
    return;
  }

  cards.forEach((card, index) => {
    card.style.transition = "transform 0.5s ease";
    card.style.zIndex = index + 1;

    if (index === cards.length - 1) {
      card.style.transform = "scale(1) translateY(0)";
    } else if (index === cards.length - 2) {
      card.style.transform = "scale(0.95) translateY(10px)";
    } else {
      card.style.transform = "scale(0.9) translateY(20px)";
    }
  });
}


async function loadSwipeAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/animals/random");
    const animals = await response.json();

    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    animals.forEach((animal, index) => {
      const imageSrc = animal.image && animal.image.trim() !== "" 
        ? `/assets/${animal.image}` 
        : `/assets/placeholder.jpg`;

      const card = document.createElement("div");
      card.className = "card";
      card.style.zIndex = index + 1;

      card.innerHTML = `
        <img src="${imageSrc}" class="card-img" alt="${animal.description}">
        <div class="card-content">
          <h3>${animal.name}, ${animal.age} ans</h3>
          <p>${animal.description}</p>
        </div>
      `;

      container.appendChild(card);
    });

    reorganizeCards(); // ta fonction existante pour empiler les cartes
  } catch (err) {
    console.error("Erreur chargement animaux swipe:", err);
  }
}

// Charger automatiquement au démarrage
document.addEventListener("DOMContentLoaded", loadSwipeAnimals);
