const mongoose = require('mongoose');
const CarburantSchema = new mongoose.Schema({
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

module.exports = Carburant = mongoose.model('carburant', CarburantSchema);
