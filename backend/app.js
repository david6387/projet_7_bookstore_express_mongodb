const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Book = require("./models/Book");

mongoose
  .connect(
    "mongodb+srv://david:FYZUTb3FYJLGkrFh@clusterbookstore.eqgpj7q.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// const userRoutes = require("./routes/user");

app.post("/api/books", (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre enregistré" }))
    .catch((error) => res.status(400).json({ error }));
});

app.put("/api/books/:id", (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre modifié" }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/books/:id", (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre supprimé" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/books/:id", (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(thing))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/books", (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT; DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue" });
  next();
});

app.use((req, res) => {
  console.log("Réponse envoyée avec succès !!");
});

// app.use("/api/auth", userRoutes);

module.exports = app;
