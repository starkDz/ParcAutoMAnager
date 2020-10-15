const mongoose = require('mongoose');
const CouleurSchema = new mongoose.Schema({
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

module.exports = Couleur = mongoose.model('couleur', CouleurSchema);
