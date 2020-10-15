const mongoose = require('mongoose');
const CompanieAssuranceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  description_Fr: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CompanieAssurance = mongoose.model(
  'companieAssurance',
  CompanieAssuranceSchema
);
