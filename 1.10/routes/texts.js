const express = require('express');
const {
  readAll,
  readOne,
  createOne,
  deleteOne,
  updateOne,
  validatedLevel,
} = require('../models/texts');

const router = express.Router();

// Read all the texts, filtered by level if the query param exists
router.get('/', (req, res) => {
  const level = req?.query?.level;

  const textsPotentiallyFiltered = readAll(level);

  if (textsPotentiallyFiltered === undefined) return res.sendStatus(400);

  return res.json(textsPotentiallyFiltered);
});

// Read a Text from its id
router.get('/:id', (req, res) => {
  const foundText = readOne(req?.params?.id);

  if (!foundText) return res.sendStatus(404);

  return res.json(foundText);
});

// Create a Text
router.post('/', (req, res) => {
  const content = req?.body?.content?.trim()?.length !== 0 ? req.body.content : undefined;
  const level = validatedLevel(req?.body?.level) ? req.body.level : undefined;

  if (!content || !level) return res.sendStatus(400);

  const createdText = createOne(content, level);

  return res.json(createdText);
});

// Delete a Text
router.delete('/:id', (req, res) => {
  const deletedText = deleteOne(req?.params?.id);

  if (!deletedText) return res.sendStatus(404);

  return res.json(deletedText);
});

// Update a Text only if all properties are given
router.put('/:id', (req, res) => {
  const content = req?.body?.content;
  const level = validatedLevel(req?.body?.level) ? req.body.level : undefined;

  if (!req.body || !content || !content.trim() || !level) return res.sendStatus(400);

  const updatedText = updateOne(req?.params?.id, req?.body);

  if (!updatedText) return res.sendStatus(404);

  return res.json(updatedText);
});

module.exports = router;
