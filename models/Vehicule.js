const mongoose = require('mongoose');
const VehiculeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chauffeur',
  },
  marque: {
    type: String,
  },
  model: {
    type: String,
  },
  observation: {
    type: String,
  },
  categorie: {
    type: String,
  },
  matricule: {
    type: String,
  },
  dateMiseEnService: {
    type: Date,
  },
  numeroSerie: {
    type: String,
  },
  couleur: {
    type: String,
  },
  actif: {
    type: Boolean, // Est Ce n'est pas en Panne
    default: true,
  },
  kilometrage: {
    type: Number,
  },
  carburant: {
    type: String,
  },
  controlTechnique: [
    {
      dateControl: {
        type: Date,
        required: true,
      },
      observation: {
        type: String,
        required: true,
      },
    },
  ],
  historyPanne: [
    {
      datePanne: {
        type: Date,
        required: true,
      },
      typePanne: {
        type: String,
        required: true,
      },
      driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chauffeur',
      },
      observation: {
        type: String,
      },
    },
  ],
  vidange: [
    {
      dateVidange: {
        type: Date,
        required: true,
      },
      kilometrage: {
        type: Number,
        required: true,
      },
      observation: {
        type: String,
      },
    },
  ],
  assurance: [
    {
      dateAssurance: {
        type: Date,
        required: true,
      },
      typeAssurance: {
        type: String,
        required: true,
      },
      companyAssurance: {
        type: String,
        required: true,
      },
      duree: {
        type: String,
        required: true,
      },
      prix: {
        type: Number,
        required: true,
      },
      observation: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Vehicule = mongoose.model('vehicule', VehiculeSchema);
