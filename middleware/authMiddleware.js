const jwt = require("jsonwebtoken");

// Middleware to check JWT token
const authenticateToken = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    // Verify token
    const decoded = jwt.verify(token, "secretkey"); // Use same secret as in authController
    req.user = decoded; // attach user info to request
    next(); // allow access to route
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;