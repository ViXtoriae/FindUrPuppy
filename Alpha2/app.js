// Hamburger
const hamburger = document.querySelector('.hamburger');
const navRight = document.querySelector('.nav-right');
hamburger.addEventListener('click', () => { navRight.classList.toggle('active'); });

// Filtre
fetch('animalType.json')
  .then(r => r.json())
  .then(data => {
    const select = document.getElementById('filter-type');
    data.types.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t; opt.textContent = t.charAt(0).toUpperCase()+t.slice(1);
      select.appendChild(opt);
    });
  });

document.getElementById("filter-btn").addEventListener("click", () => {
  const type = document.getElementById("filter-type").value;
  const sex = document.getElementById("filter-sex").value;
  const age = document.getElementById("filter-age").value;
  const size = document.getElementById("filter-size").value;
  localStorage.setItem("animalFilters", JSON.stringify({ type, sex, age, size }));
  window.location.href = "adopt.html";
});

// Tinder-like
let animals = [
  { name: "Gemal", type:"chien", img:"assets/Gemal.jpg" },
  { name: "Luna", type:"chat", img:"assets/luna.jpg" }
];
let liked = [];
const cardsContainer = document.getElementById("cards-container");
const likedList = document.getElementById("liked-list");

function showCard(index){
  if(index>=animals.length) return;
  const a = animals[index];
  cardsContainer.innerHTML = `<div class="card"><img src="${a.img}" alt="${a.name}"><h4>${a.name}</h4></div>`;
}
let current=0;
showCard(current);

document.getElementById("like").addEventListener("click", () => {
  liked.push(animals[current].name);
  likedList.innerHTML += `<li>${animals[current].name}</li>`;
  current++; showCard(current);
});
document.getElementById("nope").addEventListener("click", () => {
  current++; showCard(current);
});

// Firestore avis
const firebaseConfig = {
  // Ton config Firestore ici
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const reviewsContainer = document.getElementById("reviews-container");
db.collection("avis").get().then(snapshot=>{
  snapshot.forEach(doc=>{
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "client__card";
    div.innerHTML = `<div class="client__details">
      <img src="${data.avatar}" alt="${data.name}">
      <h4>${data.name}</h4><h5>${data.date}</h5>
    </div><p>${data.comment}</p>`;
    reviewsContainer.appendChild(div);
  });
});
