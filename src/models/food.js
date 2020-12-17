'use strict';

const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String },
  date: { type: Date, default: Date.now },
  message: { type: String, required: true },
});

const foodModel = mongoose.model('food', foodSchema);

module.exports = foodModel;
