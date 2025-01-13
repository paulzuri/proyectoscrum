const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const { verify } = require('jsonwebtoken');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

//post a book

router.post("/create-book", verifyAdminToken, postABook);

// get all books
router.get("/", getAllBooks)

// get single book
router.get("/:id", getSingleBook)

// update a book endpoint
router.put("/edit/:id", verifyAdminToken, UpdateBook);

router.delete("/:id",verifyAdminToken, deleteABook)

module.exports = router;