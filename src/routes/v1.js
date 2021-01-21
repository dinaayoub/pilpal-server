'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../models/data-collection.js');

const router = express.Router();

const models = new Map();

router.param('model', (req, res, next) => {
  try {
    const modelName = req.params.model;
    if (models.has(modelName)) {
      req.model = models.get(modelName);
      console.log(req.model);
      next();
    } else {
      const fileName = `${__dirname}/../models/${modelName}.js`;
      if (fs.existsSync(fileName)) {
        const model = require(fileName);
        models.set(modelName, new Collection(model));
        req.model = models.get(modelName);
        console.log(req.model);
        next();
      }
      else {
        next('Invalid Model');
      }
    }
  } catch (error) {
    console.error('ERROR ------', error);
    res.status(500).send('Error, something went wrong when accessing this route');
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  }
  catch (error) {
    res.status(500).send('Unable to get all items: ' + error.message);
    console.error('ERROR -----', error);
  }
}

async function handleGetOne(req, res) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  }
  catch (error) {
    res.status(404).send('Item not found: ' + error.message);
    console.error('ERROR -----', error);

  }
}

async function handleCreate(req, res) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  }
  catch (error) {
    res.status(404).send('Could not create item: ' + error.message);
    console.error('ERROR -----', error);

  }
}

async function handleUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  }
  catch (error) {
    res.status(404).send('Could not update item: ' + error.message);
    console.error('ERROR -----', error);

  }
}

async function handleDelete(req, res) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  }
  catch (error) {
    res.status(404).send('Could not delete item: ' + error.message);
    console.error('ERROR -----', error);

  }
}


module.exports = router;
