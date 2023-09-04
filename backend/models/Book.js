const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  grade: { type: Number, required: true },
});

const bookSchema = mongoose.Schema({
  // id
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [ratingSchema],
  averageRating: { type: Number, required: true },
});

module.exports = mongoose.model("Book", bookSchema);

// [{
//     "id": "1",
//     "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
//     "title" : "Milwaukee Mission",
//     "author": "Elder Cooper",
//     "imageUrl" : "https://via.placeholder.com/206x260",
//     "year" : 2021,
//     "genre" : "Policier",
//     "ratings" : [{
//       "userId" : "1",
//       "grade": 5
//     },
//       {
//         "userId" : "1",
//         "grade": 5
//       },
//       {
//         "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
//         "grade": 5
//       },
//       {
//         "userId" : "1",
//         "grade": 5
//       }],
//     "averageRating": 3
//   },
