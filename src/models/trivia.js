'use strict';

const mongoose = require('mongoose');

// 1. make a schema
const triviaSchema = mongoose.Schema({
  category: { type: String },
  answer: { type: String, required: true },
  question: { type: String, required: true },
  img: { type: String }
});

// 2. export this schema as a model
const triviaModel = mongoose.model('trivia', triviaSchema);

module.exports = triviaModel;