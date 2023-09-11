const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/texts.json');

function readAll(level) {
  const texts = parse(jsonDbPath);

  if (level === undefined) return texts;

  if (!validatedLevel(level)) return undefined;

  const textsFiltered = texts.filter((text) => text.level === level);
  return textsFiltered;
}

function validatedLevel(level) {
  const existingLevels = ['easy', 'medium', 'hard'];
  return existingLevels.some((existingLevel) => existingLevel === level);
}

function readOne(id) {
  const texts = parse(jsonDbPath);
  const indexOfFilmFound = texts.findIndex((text) => text.id === id);
  if (indexOfFilmFound < 0) return undefined;

  return texts[indexOfFilmFound];
}

function createOne(content, level) {
  const texts = parse(jsonDbPath);

  const createdText = {
    id: uuidv4(),
    content,
    level,
  };

  texts.push(createdText);

  serialize(jsonDbPath, texts);

  return createdText;
}

function deleteOne(id) {
  const texts = parse(jsonDbPath);
  const foundIndex = texts.findIndex((text) => text.id === id);
  if (foundIndex < 0) return undefined;
  const deletedtexts = texts.splice(foundIndex, 1);
  const deletedText = deletedtexts[0];
  serialize(jsonDbPath, texts);

  return deletedText;
}

function updateOne(id, textProps) {
  const texts = parse(jsonDbPath);
  const indexOfTextFound = texts.findIndex((text) => text.id === id);

  if (indexOfTextFound < 0) {
    return undefined;
  }

  const textPriorToChange = texts[indexOfTextFound];

  const updatedText = {
    ...textPriorToChange,
    ...textProps,
  };

  texts[indexOfTextFound] = updatedText;

  serialize(jsonDbPath, texts);

  return updatedText;
}

module.exports = {
  readAll,
  readOne,
  createOne,
  deleteOne,
  updateOne,
  validatedLevel,
};
