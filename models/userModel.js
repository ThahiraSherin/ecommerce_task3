const db = require("./db");

// Create a new user
const createUser = (name, email, hashedPassword, callback) => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], callback);
};

// Find user by email (for login)
const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

// Find user by ID
const findUserById = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = { createUser, findUserByEmail, findUserById };