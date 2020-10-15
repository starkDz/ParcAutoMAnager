const mongoose = require('mongoose');
const CategorieSchema = new mongoose.Schema({
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

module.exports = Categorie = mongoose.model('categorie', CategorieSchema);
