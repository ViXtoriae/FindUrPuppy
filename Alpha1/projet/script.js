const allAnimals = [
  {
    name: "Luna",
    desc: "Chatte douce et joueuse, 2 ans.",
    img: "images/luna.jpg",
    type: "chat"
  },
  {
    name: "Toudou",
    desc: "Chatte douce et joueuse, 2 ans.",
    img: "images/toudou.jpg",
    type: "chien"
  },
  {
    name: "Rex",
    desc: "Chien loyal et affectueux, 4 ans.",
    img: "images/rex.jpg",
    type: "chien"
  },
  {
    name: "T-pex",
    desc: "Chien loyal et affectueux, 4 ans.",
    img: "images/t-pex.jpg",
    type: "chien"
  },
  {
    name: "Titi",
    desc: "Petit oiseau curieux et bavard.",
    img: "images/titi.jpg",
    type: "autre"
  },
{
    name: "Rex",
    desc: "Chien loyal et affectueux, 4 ans.",
    img: "images/rex.jpg",
    type: "chien"
  },
{
    name: "Coussin",
    desc: "Chien loyal et affectueux, 4 ans.",
    img: "images/coussin.jpg",
    type: "chien"
  },
  {
    name: "Ariana Grande",
    desc: "Chien loyal et affectueux, 4 ans.",
    img: "images/gemal.jpg",
    type: "chien"
  },

];

const userChoice = localStorage.getItem("animalPreference");
const animals = allAnimals.filter(a => a.type === userChoice);

let index = 0;
let adopted = [];

const card = document.getElementById("animal-card");
const nameEl = document.getElementById("animal-name");
const descEl = document.getElementById("animal-desc");
const imgEl = document.getElementById("animal-img");
const resultEl = document.getElementById("result");

function showAnimal() {
  if (index >= animals.length) {
    showResult();
    return;
  }
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
  adopted.push(animals[index]);
  index++;
  showAnimal();
});

document.getElementById("nope").addEventListener("click", () => {
  index++;
  showAnimal();
});

showAnimal();
