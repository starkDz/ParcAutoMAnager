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
//Get One Element By Id
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
//Delete All Elements
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
//Update based On Id
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

//Ajouter des pannes Avec Le Puts

// historyPanne: [
//   {
//     datePanne: {
//       type: Date,
//       required: true,
//     },
//     typePanne: {
//       type: Number,
//       required: true,
//     },
//     driver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'chauffeur',
//     },
//     observation: {
//       type: String,
//     },
//   },
// ],

router.put('/newPanne/:id', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { datePanne, typePanne, driver, observation } = req.body;

  //Build type objects
  const Fields = {};
  if (datePanne) Fields.datePanne = datePanne;
  if (typePanne) Fields.typePanne = typePanne;
  if (driver) Fields.driver = driver;
  if (observation) Fields.observation = observation;

  try {
    const element = await Vehicule.findOne({ _id: req.params.id });
    element.historyPanne.unshift(Fields);
    await element.save();
    res.json(element);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Ajouter des Controls Techniques
router.put('/newControl/:id', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { dateControl, observation } = req.body;

  //Build type objects
  const Fields = {};
  if (dateControl) Fields.dateControl = dateControl;
  if (observation) Fields.observation = observation;

  try {
    const element = await Vehicule.findOne({ _id: req.params.id });
    element.controlTechnique.unshift(Fields);
    await element.save();
    res.json(element);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//Ajouter des Vidange
router.put('/newVidange/:id', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { dateVidange, kilometrage, observation } = req.body;

  //Build type objects
  const Fields = {};
  if (dateVidange) Fields.dateVidange = dateVidange;
  if (kilometrage) Fields.kilometrage = kilometrage;
  if (observation) Fields.observation = observation;

  try {
    const element = await Vehicule.findOne({ _id: req.params.id });
    element.vidange.unshift(Fields);
    await element.save();
    res.json(element);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Ajouter des assuren
router.put('/newAssurance/:id', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    dateAssurance,
    typeAssurance,
    companyAssurance,
    duree,
    prix,
    observation,
  } = req.body;

  //Build type objects
  const Fields = {};
  if (dateAssurance) Fields.dateAssurance = dateAssurance;
  if (typeAssurance) Fields.typeAssurance = typeAssurance;
  if (companyAssurance) Fields.companyAssurance = companyAssurance;
  if (duree) Fields.duree = duree;
  if (prix) Fields.prix = prix;
  if (observation) Fields.observation = observation;

  try {
    const element = await Vehicule.findOne({ _id: req.params.id });
    element.assurance.unshift(Fields);
    await element.save();
    res.json(element);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
