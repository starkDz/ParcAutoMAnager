const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Vehicule = require('../../models/Vehicule');

router.post(
  '/',
  [
    // auth,
    [
      check('matricule', 'matricule is required').not().isEmpty(),
      check('marque', 'marque is required').not().isEmpty(),
      check('categorie', 'categorie is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      driver,
      marque,
      model,
      observation,
      categorie,
      matricule,
      dateMiseEnService,
      numeroSerie,
      kilometrage,
      couleur,
      carburant,
    } = req.body;

    //Build type objects
    const Fields = {};
    // Fields.owner = req.user.id;
    if (driver) Fields.driver = driver;
    if (marque) Fields.marque = marque;

    if (kilometrage) Fields.kilometrage = kilometrage;
    if (model) Fields.model = model;
    if (categorie) Fields.categorie = categorie;
    if (matricule) Fields.matricule = matricule;
    if (dateMiseEnService) Fields.dateMiseEnService = dateMiseEnService;
    if (observation) Fields.observation = observation;
    if (numeroSerie) Fields.numeroSerie = numeroSerie;
    if (couleur) Fields.couleur = couleur;
    if (carburant) Fields.carburant = carburant;

    try {
      element = new Vehicule(Fields);
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
    const elements = await Vehicule.find().populate('owner', ['name']);
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
    await Vehicule.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Element Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/ById/:id', async (req, res) => {
  try {
    //remove type
    const element = await Vehicule.findOne({ _id: req.params.id });
    res.json(element);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/', async (req, res) => {
  try {
    //remove type
    await Vehicule.deleteMany({});

    res.json({ msg: 'all Elements are Deleted' });
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
      check('marque', 'marque is required').not().isEmpty(),
      check('matricule', 'matricule is required').not().isEmpty(),
      check('categorie', 'categorie is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      driver,
      marque,
      model,
      observation,
      categorie,
      kilometrage,
      matricule,
      dateMiseEnService,
      numeroSerie,
      couleur,
      carburant,
    } = req.body;

    //Build type objects
    const Fields = {};
    // Fields.owner = req.user.id;
    if (driver) Fields.driver = driver;
    if (marque) Fields.marque = marque;
    if (kilometrage) Fields.kilometrage = kilometrage;
    if (model) Fields.model = model;
    if (categorie) Fields.categorie = categorie;
    if (matricule) Fields.matricule = matricule;
    if (dateMiseEnService) Fields.dateMiseEnService = dateMiseEnService;
    if (observation) Fields.observation = observation;
    if (numeroSerie) Fields.numeroSerie = numeroSerie;
    if (couleur) Fields.couleur = couleur;
    if (carburant) Fields.carburant = carburant;

    try {
      element = await Vehicule.findOneAndUpdate(
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
