'use strict';

const mongoose = require('mongoose');

const medicationSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String },
  dosage: { type: String },
  frequency: { type: String },
  time_of_day: { type: String },
  notes: { type: String }
});

const medicationsModel = mongoose.model('medications', medicationSchema);

module.exports = medicationsModel;
