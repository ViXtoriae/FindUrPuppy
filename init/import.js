// importAnimals.js
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

async function importAnimals() {
  let connection;
  try {
    // Connexion
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "adoptme"
    });
    console.log("Connexion MySQL établie !!");

        // Lecture JSON file animal
    const refuges = JSON.parse(fs.readFileSync("refuges.json", "utf-8"));

    // Insert refuges values
    for (const refuge of refuges) { 
      await connection.query( 
        `INSERT INTO refuges (name, city, address, phone, image) VALUES (?, ?, ?, ?, ?)`, 
        [refuge.name, refuge.city, refuge.address, refuge.phone, refuge.image] ); 
      console.log(`- Refuge inséré : ${refuge.name}`);
      }

    // Lecture JSON file animal
    const animals = JSON.parse(fs.readFileSync("animals.json", "utf-8"))

    // Insert animal values
    for (const animal of animals) {
      await connection.query(
        `INSERT INTO animals 
         (name, type, age, sex, size, description, image, refuge_id) 
         VALUES (?,?,?,?,?,?,?,?         )`,
        [animal.name, animal.type, animal.age, animal.sex,animal.size,animal.description, animal.image,animal.refuge_id]);
      console.log(`- Animal inséré : ${animal.name}`);
    }



    console.log("Import des JSON's terminé !!");
    await connection.end();
  } catch (err) {
    console.error("Erreur lors de l'import :", err);
    process.exit(1);
  }
}

await importAnimals();
