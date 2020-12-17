'use strict';

const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, uppercase: true, enum: ['FRUIT', 'VEGETABLE', 'PROTEIN'] },
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
