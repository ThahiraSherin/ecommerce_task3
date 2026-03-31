const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(400).json({ error: err });
      res.json({ message: "User registered successfully" });
    }
  );
};

const login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, users) => {
    if (err) return res.status(400).json({ error: err });
    if (users.length === 0) return res.status(404).json({ error: "User not found" });

    const user = users[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
};

module.exports = { register, login };