const db = require("../models/db");

const getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

module.exports = { getAllProducts };