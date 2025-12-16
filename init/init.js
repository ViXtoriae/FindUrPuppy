// initAll.js
import mysql from "mysql2/promise";

async function initAll() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root"
    });
    console.log("Connexion MySQL établie");

    await connection.query("CREATE DATABASE IF NOT EXISTS adoptme");
    await connection.query("USE adoptme");

    // Table users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Table refuges
    await connection.query(`
      CREATE TABLE IF NOT EXISTS refuges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        city VARCHAR(100),
        address VARCHAR(255),
        phone VARCHAR(20),
        image VARCHAR(255) DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Table animals
    await connection.query(`
      CREATE TABLE IF NOT EXISTS animals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type ENUM('chien','chat','autre') NOT NULL,
        age INT,
        sex ENUM('male','femelle') DEFAULT NULL,
        size ENUM('petit','moyen','grand') DEFAULT NULL,
        description TEXT,
        image VARCHAR(255),
        refuge_id INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (refuge_id) REFERENCES refuges(id) ON DELETE CASCADE
      )
    `);

    // Admin par défaut
    const [rows] = await connection.query("SELECT * FROM users WHERE username=?", ["admin"]);
    if (rows.length === 0) {
      await connection.query("INSERT INTO users (username, password, email) VALUES (?,?,?)", ["admin", "1234", "admin@adoptme.fr"]);
      console.log("Utilisateur admin créé (login: admin / mdp: 1234)");
    }

    console.log("Initialisation terminée !!");
    await connection.end();
  } catch (err) {
    console.error("Erreur lors de l'initialisation :", err);
    process.exit(1);
  }
}

await initAll();
