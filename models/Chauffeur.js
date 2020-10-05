const mongoose = require('mongoose');
const ChauffeurSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  observation: {
    type: String,
  },
  sexe: {
    type: String,
  },
  dateNaissance: {
    type: Date,
  },
  embauche: {
    type: Date,
  },
  telephone: {
    type: String,
  },
  telephone2: {
    type: String,
  },
  permis: {
    type: String,
  },
  address: {
    type: String,
  },
  code: {
    type: String,
  },
  groupage: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Chauffeur = mongoose.model('chauffeur', ChauffeurSchema);
