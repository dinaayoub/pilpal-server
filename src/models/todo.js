'use strict';

const mongoose = require('mongoose');

// 1. make a schema
const toDoSchema = mongoose.Schema({
  text: { type: String, required: true },
  assignee: { type: String },
  complete: { type: Boolean, default: false },
  difficulty: { type: Number, default: 1 },
  duedate: { type: String }
});

// 2. export this schema as a model
const toDoModel = mongoose.model('todo', toDoSchema);

module.exports = toDoModel;