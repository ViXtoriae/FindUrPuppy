let animals = [];
fetch('animalData.txt')
  .then(r => r.text())
  .then(text => {
    animals = JSON.parse(text);
    const filters = JSON.parse(localStorage.getItem("animalFilters") || "{}");
    animals = animals.filter(a =>
      (!filters.type || a.type === filters.type) &&
      (!filters.sex || a.sex === filters.sex) &&
      (!filters.age || a.age === filters.age) &&
      (!filters.size || a.size === filters.size)
    );
    showAnimal();
  })
  .catch(err => console.error("Erreur lecture animalData.txt :", err));

let index = 0;
let adopted = [];

const card = document.getElementById("animal-card");
const nameEl = document.getElementById("animal-name");
const descEl = document.getElementById("animal-desc");
const imgEl = document.getElementById("animal-img");
const resultEl = document.getElementById("result");

function showAnimal() {
  if (!animals.length || index >= animals.length) { showResult(); return; }
  const a = animals[index];
  nameEl.textContent = a.name;
  descEl.textContent = a.desc;
  imgEl.src = a.img;
}

function showResult() {
  card.style.display = "none";
  document.querySelector(".buttons").style.display = "none";
  resultEl.innerHTML = `<h2>Animaux adoptés 🐾</h2>
    <ul>${adopted.map(a => `<li>${a.name}</li>`).join('')}</ul>
    <a href="index.html">⬅ Revenir à l’accueil</a>`;
}

document.getElementById("like").addEventListener("click", () => {
  adopted.push(animals[index]); index++; showAnimal();
});

document.getElementById("nope").addEventListener("click", () => {
  index++; showAnimal();
});
