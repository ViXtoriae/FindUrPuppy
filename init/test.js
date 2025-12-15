// test.js
import mysql from "mysql2/promise";

async function testDB() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "adoptme"
    });
    console.log("Connexion MySQL établie ✅");

    // test recup animaux
    const [animals] = await connection.query("SELECT * FROM animals");
    console.log("Animaux :", animals);

    // test recup refuges
    const [refuges] = await connection.query("SELECT * FROM refuges");
    console.log("Refuges :", refuges);

    // test recup users
    const [users] = await connection.query("SELECT * FROM users");
    console.log("Utilisateurs :", users);

    await connection.end();
    console.log("Connexion fermée ✅");
  } catch (err) {
    console.error("Erreur lors du test :", err);
    process.exit(1);
  }
}

await testDB();
