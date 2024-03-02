const express = require("express");
const booksRouter = express.Router();
const Joi = require("joi");
const books = require("../data");

const bookSchema = Joi.object({
  title: Joi.string().required().label("Title"),
  author: Joi.string().required().label("Author"),
});

booksRouter.get("/", (req, res, next) => {
  try {
    res.json(books);
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/:id", (req, res, next) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = books.find((p) => p.id === bookId);

    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
});

booksRouter.post("/", (req, res, next) => {
  try {
    const { error, value } = bookSchema.validate(req.body);
    if (error) {
      const validationError = new Error("Validation Error");
      validationError.status = 403;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { title, author } = value;

    const newBook = {
      id: books.length + 1,
      title,
      author,
    };

    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

booksRouter.put("/:id", (req, res, next) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = books.find((p) => p.id === bookId);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }

    const { error, value } = bookSchema.validate(req.body);

    if (error) {
      const validationError = new Error("Validation error");
      validationError.status = 400;
      validationError.detail = error.details.map((detail) => detail.message);
      throw validationError;
    }

    book.title = value.title;
    book.author = value.author;

    res.json(book);
  } catch (error) {
    next(error);
  }
});

booksRouter.delete("/:id", (req, res, next) => {
  try {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex((p) => p.id === bookId);
    if (index === -1) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    deletedBook = books.splice(index, 1);
    res.json(deletedBook);
    body = {
      message: `Book #${bookId} deleted`,
      book: deletedBook,
    };
  } catch (error) {
    next(error);
  }
});

module.exports = booksRouter;
