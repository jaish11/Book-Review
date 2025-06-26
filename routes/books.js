const express = require("express");
const router = express.Router();
const { getAllBooks, createBook } = require("../controllers/books");
const { getBookReviews, createBookReview } = require("../controllers/reviews");

// GET /books - List all books
router.get("/", getAllBooks);

// POST /books - Add a new book
router.post("/", createBook);

// GET /books/:id/reviews - Get reviews for a book
router.get("/:id/reviews", getBookReviews);

// POST /books/:id/reviews - Add a review for a book
router.post("/:id/reviews", createBookReview);

module.exports = router;
