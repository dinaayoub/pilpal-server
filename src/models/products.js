'use strict';

const mongoose = require('mongoose');

// 1. make a schema
const toDoSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  img: { type: String }
});

// 2. export this schema as a model
const toDoModel = mongoose.model('products', toDoSchema);

module.exports = toDoModel;