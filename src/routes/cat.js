const express = require('express');
const schema = require('../db/schema');
const db = require('../db/connection');

console.log(db)

const cats = db.get('cat');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    console.log("mata ma 1");
    const allCats = await cats.find({});
    console.log("mata ma 2");
    res.json(allCats);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cat = await cats.findOne({
      _id: id,
    });

    if (!cat) {
      const error = new Error('cat does not exist');
      return next(error);
    }

    res.json(cat);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, age, breed, owner, date } = req.body;
    const result = await schema.validateAsync({ name, age, breed, owner, date });

    const cat = await cats.findOne({
      name,
      age,
    });

    if (cat) {
      const error = new Error('cat already exists');
      res.status(409);
      return next(error);
    }

    const newcat = await cats.insert({
      name, 
      age, 
      breed, 
      owner, 
      date,
    });

    res.status(201).json(newcat);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id, } = req.params;
    const { name, age, breed, owner, date } = req.body;
    const result = await schema.validateAsync({ name, age, breed, owner, date });
    const cat = await cats.findOne({
      id: id,
    });

    if (!cat) {
      return next();
    }

    const updatedcat = await cats.update({
      _id: id,
    }, { $set: result },
    { upsert: true });

    res.json(updatedcat);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cat = await cats.findOne({
      _id: id,
    });

    if (!cat) {
      return next();
    }
    await cats.remove({
      _id: id,
    });

    res.json({
      message: 'cat has been deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;