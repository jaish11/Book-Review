const { StatusCodes } = require("http-status-codes");
const Book = require("../models/Book");
const Review = require("../models/Review");

const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.id });
    if (!reviews.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No reviews found for this book",
      });
    }
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

const createBookReview = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Book not found",
      });
    }

    const review = new Review({
      book: req.params.id,
      ...req.body,
    });

    await review.save();
    res.status(StatusCodes.CREATED).json(review);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Error creating review",
      error: error.message,
    });
  }
};

module.exports = {
  getBookReviews,
  createBookReview,
};
