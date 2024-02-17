const asyncHandler = require("express-async-handler");
const Order = require("../models/order");

exports.createOrder = asyncHandler(async (req, res) => {
  try {
    const { userId, books } = req.body;
    if (!userId || !books || !Array.isArray(books)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const total = books.reduce((acc, book) => acc + book.price, 0);
    const order = await Order.create({ user: userId, books, total });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.getUserOrders = asyncHandler(async (req, res) => {
  try {
    const userIdFromToken = req.token.userId;
    const userId = req.params.userId;
    if (userIdFromToken !== req.params.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized access to user orders" });
    }
    const orders = await Order.find({ user: userId })
      .populate({
        path: "user",
        select: "name email address phone paymentCard",
      })
      .populate("books");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
