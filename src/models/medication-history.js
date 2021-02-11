'use strict';

const mongoose = require('mongoose');

const medicationHistorySchema = mongoose.Schema({
  medication_id: { type: String, required: true },
  user_id: { type: String, required: true },
  name: { type: String },
  date: { type: String },
  time_of_day: { type: String }, //this string can be = "Day, Afternoon, Evening, Night"
  notes: { type: String },
});

const medicationHistoryModel = mongoose.model('medication_history', medicationHistorySchema);

module.exports = medicationHistoryModel;
