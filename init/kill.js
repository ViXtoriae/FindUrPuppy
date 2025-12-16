import mysql from "mysql2/promise";

async function dropDB() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root"
    });
    console.log("Connexion MySQL établie");

    await connection.query("DROP DATABASE IF EXISTS adoptme");
    console.log("Base de données 'adoptme' supprimée");

    await connection.end();
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    process.exit(1);
  }
}

await dropDB();
