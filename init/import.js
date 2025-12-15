// importAnimals.js
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

async function importAnimals() {
  let connection;
  try {
    // Connexion à MySQL
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "adoptme"
    });
    console.log("Connexion MySQL établie ✅");

    // Lire le fichier JSON (chemin robuste)
    const data = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "animals.json"), "utf-8")
    );

    // Insérer chaque animal
    for (const animal of data) {
      await connection.query(
        `INSERT INTO animals 
         (name, type, age, sex, size, description, image, refuge_id) 
         VALUES (?,?,?,?,?,?,?, 
           (SELECT id FROM refuges WHERE name=? LIMIT 1)
         )`,
        [
          animal.name,
          animal.type,
          animal.age,
          animal.sex,
          animal.size,
          animal.description, // ✅ clé corrigée
          animal.image,         // ✅ clé corrigée
          animal.refuge_id
        ]
      );
      console.log(`✔ Animal inséré : ${animal.name}`);
    }

    console.log("Import JSON terminé ✅");
    await connection.end();
  } catch (err) {
    console.error("Erreur lors de l'import :", err);
    process.exit(1);
  }
}

await importAnimals();
