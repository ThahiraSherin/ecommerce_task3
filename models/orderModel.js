const db = require("./db");

// Create a new order
const createOrder = (user_id, total_amount, callback) => {
  const sql = "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";
  db.query(sql, [user_id, total_amount], callback);
};

// Get order by ID
const getOrderById = (id, callback) => {
  const sql = "SELECT * FROM orders WHERE id = ?";
  db.query(sql, [id], callback);
};

// Get all orders for a user
const getOrdersByUserId = (user_id, callback) => {
  const sql = "SELECT * FROM orders WHERE user_id = ?";
  db.query(sql, [user_id], callback);
};

module.exports = { createOrder, getOrderById, getOrdersByUserId };