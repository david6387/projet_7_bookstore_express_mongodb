const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/user");
const booksRoutes = require("./routes/books");
const hpp = require("hpp");
const expressRateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const limiter = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false,
});

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

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"],
      "img-src": ["*"],
      "font-src": ["'self'"],
    },
  })
);

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
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

app.use(bodyParser.json());

app.use(limiter);
app.use(mongoSanitize());
app.use(hpp());

app.use("/api/auth", userRoutes);
app.use("/api/books", booksRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
