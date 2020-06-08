const mongoose = require('mongoose');
const db = require('../config/mongodbConfig.js');


const flashcardSchema = new mongoose.Schema({
  id: Number,
  question: {type: String, require: true },
  answer: {type: String, require: true },
  difficulty: {type: String, require: true },
  completed: false,
  owner: ''
});

const FlashcardModel = mongoose.model("Flashcard", flashcardSchema);

module.exports = FlashcardModel;