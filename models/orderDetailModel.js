const db = require("./db");

// Add multiple order details at once
const addOrderDetails = (details, callback) => {
  // details = [[order_id, product_id, quantity, price], ...]
  const sql = "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ?";
  db.query(sql, [details], callback);
};

// Get details for an order
const getOrderDetailsByOrderId = (order_id, callback) => {
  const sql = "SELECT * FROM order_details WHERE order_id = ?";
  db.query(sql, [order_id], callback);
};

module.exports = { addOrderDetails, getOrderDetailsByOrderId };