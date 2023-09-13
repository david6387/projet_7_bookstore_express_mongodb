const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();

const booksController = require("../controllers/books");

router.get("/bestrating", booksController.getBestRatedBooks);
router.post("/", auth, multer, booksController.createBook);
router.post("/:id/rating", auth, booksController.ratingBook);
router.put("/:id", auth, multer, booksController.modifyBook);
router.delete("/:id", auth, booksController.deleteBook);
router.get("/:id", booksController.getOneBook);
router.get("/", booksController.getAllBooks);

module.exports = router;
