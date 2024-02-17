const asyncHandler = require("express-async-handler");
const Book = require("../models/book");

exports.getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
