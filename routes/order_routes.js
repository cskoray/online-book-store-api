const express = require("express");
const { jwtDecode } = require("../middleware/auth_middleware");
const router = express.Router();
const orderController = require("../controllers/order_controller");

router.post("/", jwtDecode, orderController.createOrder);
router.get("/:userId", jwtDecode, orderController.getUserOrders);

module.exports = router;
