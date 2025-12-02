
const allAnimals = [
  { name: "Luna", desc: "Chatte douce et joueuse, 2 ans.", img: "images/luna.jpg", type: "chat" },
  { name: "Toudou", desc: "Chien joueur et affectueux, 2 ans.", img: "images/toudou.jpg", type: "chien" },
  { name: "Rex", desc: "Chien loyal et affectueux, 4 ans.", img: "images/rex.jpg", type: "chien" },
  { name: "T-pex", desc: "Chien protecteur et énergique.", img: "images/T-pex.jpg", type: "chien" },
  { name: "Titi", desc: "Petit oiseau curieux et bavard.", img: "images/titi.jpg", type: "autre" },
  { name: "Coussin", desc: "Chien très calme, aime dormir sur toi.", img: "images/coussin.jpg", type: "chien" },
  { name: "Ariana Grande", desc: "Très belle... mais aboie en chantant.", img: "images/Gemal.jpg", type: "chien" }
];

const userChoice = localStorage.getItem("animalPreference");
const animals = allAnimals.filter(a => a.type === userChoice);

let index = 0;
let adopted = [];
let history = []; // <- mémorisation des étapes

const card = document.getElementById("animal-card");
const nameEl = document.getElementById("animal-name");
const descEl = document.getElementById("animal-desc");
const imgEl = document.getElementById("animal-img");
const resultEl = document.getElementById("result");

function showAnimal() {
  if (index >= animals.length) return showResult();

  const a = animals[index];
  nameEl.textContent = a.name;
  descEl.textContent = a.desc;
  imgEl.src = a.img;
}

function showResult() {
  card.style.display = "none";
  document.querySelector(".buttons").style.display = "none";
  resultEl.innerHTML = `
    <h2>Animaux adoptés 🐾</h2>
    <ul>${adopted.map(a => `<li>${a.name}</li>`).join('')}</ul>
    <a href="index.html">⬅ Revenir à l’accueil</a>
  `;
}

document.getElementById("like").addEventListener("click", () => {
  history.push({ index, adoptedBefore: [...adopted] }); // sauvegarde état précédent
  adopted.push(animals[index]);
  index++;
  showAnimal();
});

document.getElementById("nope").addEventListener("click", () => {
  history.push({ index, adoptedBefore: [...adopted] });
  index++;
  showAnimal();
});

// 🆕 Bouton retour
document.getElementById("back").addEventListener("click", () => {
  if (history.length === 0) return; // aucune étape précédente

  const prev = history.pop();       // on reprend l'état sauvegardé
  index = prev.index;
  adopted = prev.adoptedBefore;
  showAnimal();
});

showAnimal();
