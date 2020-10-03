const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Chauffeur = require('../../models/Chauffeur');

router.post(
  '/',
  [
    // auth,
    [
      check('nom', 'nom is required').not().isEmpty(),
      check('prenom', 'prenom is required').not().isEmpty(),
      check('telephone', 'telephone is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nom,
      prenom,
      telephone,
      address,
      sexe,
      dateNaissance,
      observation,
      code,
      groupage,
    } = req.body;

    //Build type objects
    const Fields = {};
    // Fields.owner = req.user.id;
    if (nom) Fields.nom = nom;
    if (prenom) Fields.prenom = prenom;
    if (telephone) Fields.telephone = telephone;
    if (address) Fields.address = address;
    if (dateNaissance) Fields.dateNaissance = dateNaissance;
    if (sexe) Fields.sexe = sexe;
    if (observation) Fields.observation = observation;
    Fields.code = nom + '.' + prenom;
    if (groupage) Fields.groupage = groupage;

    try {
      element = new Chauffeur(Fields);
      await element.save();
      res.json(element);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get all profiles Public

router.get('/', async (req, res) => {
  try {
    const elements = await Chauffeur.find().populate('owner', ['name']);
    res.json(elements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Delete Type
router.delete('/:id', async (req, res) => {
  try {
    //remove type
    await Chauffeur.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Element Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/ByCode/:id', async (req, res) => {
  try {
    //remove type
    const element = await Chauffeur.findOne({ code: req.params.id });
    res.json(element);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/ById/:id', async (req, res) => {
  try {
    //remove type
    const element = await Chauffeur.findOne({ _id: req.params.id });
    res.json(element);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/all/', auth, async (req, res) => {
  try {
    //remove type
    await Chauffeur.deleteMany({});

    res.json({ msg: 'all Elements are Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/getCount', async (req, res) => {
  const Fields = {};
  try {
    Fields.NumberChauffeur = await Chauffeur.countDocuments();
    Fields.NumberMen = await Chauffeur.find({ sexe: 'Homme' }).countDocuments();
    Fields.NumberWomen = await Chauffeur.find({
      sexe: 'Femme',
    }).countDocuments();
    res.json(Fields);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/update/:id',
  [
    // auth,
    [
      check('nom', 'nom is required').not().isEmpty(),
      check('prenom', 'prenom is required').not().isEmpty(),
      check('telephone', 'telephone is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nom,
      prenom,
      telephone,
      address,
      sexe,
      dateNaissance,
      observation,
      code,
      groupage,
    } = req.body;

    //Build type objects
    const Fields = {};
    // Fields.owner = req.user.id;
    if (nom) Fields.nom = nom;
    if (prenom) Fields.prenom = prenom;
    if (telephone) Fields.telephone = telephone;
    if (address) Fields.address = address;
    if (dateNaissance) Fields.dateNaissance = dateNaissance;
    if (sexe) Fields.sexe = sexe;
    if (observation) Fields.observation = observation;
    Fields.code = nom + '.' + prenom;
    if (groupage) Fields.groupage = groupage;

    try {
      element = await Chauffeur.findOneAndUpdate(
        { _id: req.params.id },
        { $set: Fields },
        { new: true }
      );

      res.json(element);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
