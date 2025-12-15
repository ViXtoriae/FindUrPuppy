// ===============================
// firebase.js — gestion des avis
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// ===============================
// 1. Configuration Firebase
// ===============================
const firebaseConfig = {
    apiKey: "TA_CONFIG_FIREBASE",
    authDomain: "TA_CONFIG_FIREBASE",
    projectId: "TA_CONFIG_FIREBASE",
    storageBucket: "TA_CONFIG_FIREBASE",
    messagingSenderId: "TA_CONFIG_FIREBASE",
    appId: "TA_CONFIG_FIREBASE"
};

// Initialisation
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ===============================
// 2. Soumission d’un avis
// ===============================
const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {
    reviewForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("reviewName").value.trim();
        const text = document.getElementById("reviewText").value.trim();

        if (!name || !text) return;

        try {
            await addDoc(collection(db, "reviews"), {
                name: name,
                text: text,
                date: serverTimestamp()
            });

            document.getElementById("reviewForm").reset();
            loadReviews(); // rafraîchit automatiquement

        } catch (error) {
            console.error("Erreur lors de l’envoi de l’avis :", error);
        }
    });
}


// ===============================
// 3. Chargement des avis existants
// ===============================
async function loadReviews() {
    const reviewsList = document.getElementById("reviewsList");
    if (!reviewsList) return;

    reviewsList.innerHTML = "<p>Chargement...</p>";

    try {
        const q = query(collection(db, "reviews"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);

        reviewsList.innerHTML = "";

        snapshot.forEach(doc => {
            const data = doc.data();
            const div = document.createElement("div");
            div.classList.add("review-card");

            const date = data.date ? data.date.toDate().toLocaleDateString() : "Date inconnue";

            div.innerHTML = `
                <h3>${data.name}</h3>
                <p>${data.text}</p>
                <span class="review-date">${date}</span>
            `;

            reviewsList.appendChild(div);
        });

    } catch (error) {
        console.error("Erreur lors du chargement des avis :", error);
        reviewsList.innerHTML = "<p>Impossible de charger les avis.</p>";
    }
}


// Auto-chargement si on est sur avis.html
if (document.getElementById("reviewsList")) {
    loadReviews();
}
