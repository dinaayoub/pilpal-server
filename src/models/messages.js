'use strict';

const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String },
  date: { type: Date, default: Date.now },
  message: { type: String, required: true }
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
