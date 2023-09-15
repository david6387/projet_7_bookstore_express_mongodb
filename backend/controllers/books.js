const Book = require("../models/Book");
const fs = require("fs");

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get(
      "host"
    )}/images/${req.file.filename.replace(
      /\.jpeg|\.jpg|\.png/g,
      "_"
    )}thumbnail.webp`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre enregistré" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getBestRatedBooks = (req, res, next) => {
  Book.find()
    .then((books) => {
      books.sort((a, b) => b.averageRating - a.averageRating);
      const bestRatedBooks = books.slice(0, 3);
      res.status(200).json(bestRatedBooks);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.ratingBook = (req, res, next) => {
  let Rating = {
    userId: req.auth.userId,
    grade: req.body.rating,
  };

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      userRating = book.ratings.find((u) => u.userId === req.auth.userId);
      if (userRating) {
        res.status(400).json({ message: "Vous avez déjà donné une note" });
      } else {
        book.ratings.push(Rating);

        const sumRatings = book.ratings.reduce(
          (sum, rating) => sum + rating.grade,
          0
        );
        book.averageRating = (sumRatings / book.ratings.length).toFixed(1);

        book
          .save()
          .then((savedBook) => {
            res.status(201).json(savedBook);
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get(
          "host"
        )}/images/${req.file.filename.replace(
          /\.jpeg|\.jpg|\.png/g,
          "_"
        )}thumbnail.webp`,
      }
    : { ...req.body };
  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        if (bookObject.imageUrl) {
          const fileNameThumb = book.imageUrl.split("/images/")[1];
          const fileNameLarge = fileNameThumb.split("_thumbnail")[0];
          fs.unlink(`images/${fileNameLarge}.jpg`, () => {});
          fs.unlink(`images/${fileNameLarge}.png`, () => {});
          fs.unlink(`images/${fileNameThumb}`, () => {});
        }
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Livre modifié" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
// route de suppression
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Livre supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
