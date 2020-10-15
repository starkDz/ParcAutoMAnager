const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Couleur = require('../../models/Couleur');

router.post(
  '/',
  [
    // auth,
    [check('description_Fr', 'description is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description_Fr } = req.body;

    //Build type objects
    const Fields = {};
    // Fields.owner = req.user.id;
    if (description_Fr) Fields.description_Fr = description_Fr;

    try {
      element = new Couleur(Fields);
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
    const elements = await Couleur.find().populate('owner', ['name']);
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
    await Couleur.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Element Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/ById/:id', async (req, res) => {
  try {
    //remove type
    const element = await Couleur.findOne({ _id: req.params.id });
    res.json(element);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/', async (req, res) => {
  try {
    //remove type
    await Couleur.deleteMany({});

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
    [check('description_Fr', 'description is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { description_Fr } = req.body;

    //Build type objects
    const Fields = {};
    // Fields.owner = req.user.id;
    if (description_Fr) Fields.description_Fr = description_Fr;

    try {
      element = await Couleur.findOneAndUpdate(
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
