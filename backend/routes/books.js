const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

router.post("/", booksController.createBook);
router.put("/:id", booksController.modifyBook);
router.delete("/:id", booksController.deleteBook);
router.get("/:id", booksController.getOneBook);
router.get("/", booksController.getAllBooks);

module.exports = router;
