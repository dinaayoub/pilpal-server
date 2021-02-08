'use strict';

const mongoose = require('mongoose');

const medicationHistorySchema = mongoose.Schema({
  _id: { type: String },
  medication_id: { type: String, required: true },
  user_id: { type: String, required: true },
  datetime: { type: Date },
  notes: { type: String }
});

const medicationHistoryModel = mongoose.model('medication_history', medicationHistorySchema);

module.exports = medicationHistoryModel;
