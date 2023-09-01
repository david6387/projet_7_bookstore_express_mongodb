const express = require("express");

const app = express();

// const userRoutes = require("./routes/user");

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
