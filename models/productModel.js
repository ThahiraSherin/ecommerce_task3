const db = require("./db");

// Get all products
const getAllProducts = (callback) => {
  const sql = "SELECT * FROM products";
  db.query(sql, callback);
};

// Get product by ID
const getProductById = (id, callback) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = { getAllProducts, getProductById };