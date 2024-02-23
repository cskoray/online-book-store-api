const asyncHandler = require("express-async-handler");
const Book = require("../models/book");

exports.getAllBooks = asyncHandler(async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const cursor = parseInt(req.query.cursor);

    let query = {};
    if (cursor) {
      query._id = { $gt: cursor };
    }

    const books = await Book.find(query).limit(pageSize);
    res.json({
      data: books,
      cursor: books.length > 0 ? books[books.length - 1]._id : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
