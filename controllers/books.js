const { StatusCodes } = require("http-status-codes");
const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate("reviews");
    res.status(StatusCodes.OK).json(books);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching books",
      error: error.message,
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const book = new Book({ title, author, description });
    await book.save();
    res.status(StatusCodes.CREATED).json(book);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Error creating book",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  createBook,
};
