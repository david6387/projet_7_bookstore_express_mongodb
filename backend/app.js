const express = require("express");
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
  const book = new Book({
    ...req.body,
  });
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
