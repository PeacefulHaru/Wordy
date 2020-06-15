const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  owner: String,
  dateAdded: Number,
  year: Number,
  semester: Number,
  language: String,
  word: String,
  pronunciation: String,
  definition: String,
  exampleSentence: String,
  isPublic: Boolean
  
});

module.exports = mongoose.model('words', wordSchema); // the String value is the collection name