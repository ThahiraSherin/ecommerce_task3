const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/", authenticateToken, placeOrder);

// Get all orders for logged-in user (protected)
router.get("/", authenticateToken, getUserOrders);

module.exports = router;