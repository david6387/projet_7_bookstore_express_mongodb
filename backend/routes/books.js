const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();

const booksController = require("../controllers/books");

router.post("/", auth, booksController.createBook);
router.put("/:id", auth, multer, booksController.modifyBook);
router.delete("/:id", auth, booksController.deleteBook);
router.get("/:id", auth, booksController.getOneBook);
router.get("/", auth, booksController.getAllBooks);

module.exports = router;
