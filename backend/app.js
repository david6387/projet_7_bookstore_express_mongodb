const express = require("express");

const app = express();
// const userRoutes = require("./routes/user");
app.use((req, res, next) => {
  console.log("Requête recue");
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
