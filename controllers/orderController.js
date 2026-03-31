const db = require("../config/db"); // your mysql2 connection

// Place a new order
const placeOrder = (req, res) => {
  const userId = req.user.id; // comes from JWT middleware
  const { items } = req.body;

  // Validate items
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Order items are required" });
  }

  // Validate each item has product_id and quantity
  for (let item of items) {
    if (!item.product_id || !item.quantity || item.quantity <= 0) {
      return res.status(400).json({ error: "Invalid item data" });
    }
  }

  // Fetch prices for all product_ids
  const productIds = items.map(item => item.product_id);
  const placeholders = productIds.map(() => '?').join(',');
  const query = `SELECT id, price FROM products WHERE id IN (${placeholders})`;

  db.query(query, productIds, (err, products) => {
    if (err) return res.status(500).json({ error: err.message });

    if (products.length !== items.length) {
      return res.status(400).json({ error: "Some products not found" });
    }

    // Create a map of product_id to price
    const priceMap = {};
    products.forEach(product => {
      priceMap[product.id] = product.price;
    });

    // Calculate total amount and prepare details
    let totalAmount = 0;
    const detailsValues = [];
    for (let item of items) {
      const price = priceMap[item.product_id];
      if (!price) {
        return res.status(400).json({ error: "Product price not found" });
      }
      totalAmount += price * item.quantity;
      detailsValues.push([null, item.product_id, item.quantity, price]); // order_id will be set later
    }

    // Insert order
    const orderQuery = "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";
    db.query(orderQuery, [userId, totalAmount], (err, orderResult) => {
      if (err) return res.status(500).json({ error: err.message });

      const orderId = orderResult.insertId;

      // Update order_id in details
      detailsValues.forEach(detail => detail[0] = orderId);

      const detailsQuery = "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ?";
      db.query(detailsQuery, [detailsValues], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        res.status(201).json({
          message: "Order placed successfully",
          orderId,
          totalAmount,
          items: items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: priceMap[item.product_id]
          }))
        });
      });
    });
  });
};

// Optional: Get all orders for logged-in user
const getUserOrders = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT o.id AS order_id, o.total_amount, o.status, o.payment_method, o.created_at,
           od.product_id, od.quantity, od.price, p.name AS product_name
    FROM orders o
    JOIN order_details od ON o.id = od.order_id
    JOIN products p ON od.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Group items by order
    const orders = {};
    results.forEach(row => {
      if (!orders[row.order_id]) {
        orders[row.order_id] = {
          orderId: row.order_id,
          totalAmount: row.total_amount,
          status: row.status,
          paymentMethod: row.payment_method,
          createdAt: row.created_at,
          items: []
        };
      }
      orders[row.order_id].items.push({
        productId: row.product_id,
        productName: row.product_name,
        quantity: row.quantity,
        price: row.price
      });
    });

    res.json(Object.values(orders));
  });
};

module.exports = { placeOrder, getUserOrders };