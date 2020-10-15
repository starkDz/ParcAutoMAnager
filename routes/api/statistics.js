const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Vehicule = require('../../models/Vehicule');
const Chauffeur = require('../../models/Chauffeur');
// const Mission = require('../../models/Mission');

router.get('/', async (req, res) => {
  const Fields = {
    chauffeurNumber: 0,
    chauffeurMissionNumber: 0,
    vehiculeNumber: 0,
    vehiculePanneNumber: 0,
    missionNumber: 0,
    missionTodayNumber: 0,
  };
  try {
    Fields.vehiculeNumber = await Vehicule.countDocuments();
    Fields.chauffeurNumber = await Chauffeur.countDocuments();
    // Fields.missionNumber = await Mission.countDocuments();
    // Fields.NumberMen = await Patient.find({ sexe: 'Homme' }).countDocuments();
    // Fields.NumberWomen = await Patient.find({ sexe: 'Femme' }).countDocuments();
    // Fields.NumberRendezVousValide = await RendezVous.find({
    //   estValide: true,
    // }).countDocuments();
    // Fields.NumberRendezVousNotValide = await RendezVous.find({
    //   estValide: false,
    // }).countDocuments();

    res.json(Fields);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
