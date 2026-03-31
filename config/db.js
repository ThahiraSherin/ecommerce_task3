const mysql = require("mysql2");

// Create a connection pool
const db = mysql.createPool({
  host: "localhost",    // your MySQL host
  user: "root",         // your MySQL username
  password: "",         // your MySQL password (XAMPP default is empty)
  database: "ecommerce" // your database name
});

// Test the connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database!");
    connection.release(); // release the connection back to pool
  }
});

module.exports = db;