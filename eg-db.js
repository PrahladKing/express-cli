const path = require("path");
const fs = require("fs");

class EgDb {
  constructor(parameters) {}

  create() {

    const classDir = path.join(process.cwd(), "src/config");
    const classFilePath = path.join(classDir, "dbConfig.js");

    if (fs.existsSync(classFilePath)) {
      console.error(`File ${classFilePath} already exists.`);
      process.exit(1);
    }

    // MySQL config template
    const classTemplate = `
// src/config/dbConfig.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'db-name',
  connectionLimit: 10
});

// Export the pool for use in other modules
module.exports = pool.promise(); // Use promise-based API
`;

    fs.mkdirSync(classDir, { recursive: true });
    fs.writeFileSync(classFilePath, classTemplate.trim());
    console.log(
      `Db config file created successfully at ${classFilePath}`
    );
    process.exit(0);
  }
}

module.exports = EgDb;
