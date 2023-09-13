const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/user");
const booksRoutes = require("./routes/books");
const sharp = require("sharp");

sharp("./images/soft-skills.jpg1694534563945.jpg")
  .resize(200, 200)
  .toFile("./images/sml.soft.jpeg");

require("dotenv").config();
let mongoUser = process.env.DB_ID;
let mongoPwd = process.env.DB_PWD;
let mongoCluster = process.env.DB_CLUSTER;

mongoose
  .connect(
    `mongodb+srv://${mongoUser}:${mongoPwd}@${mongoCluster}.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/books", booksRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
