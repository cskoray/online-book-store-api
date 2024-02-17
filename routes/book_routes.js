const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book_controller");

router.get("/", bookController.getAllBooks);

module.exports = router;
