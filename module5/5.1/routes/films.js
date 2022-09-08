const express = require('express');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/films.json');

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query ? parseInt(req.query['minimum-duration'], 10) : undefined;
  if (minimumFilmDuration && (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0))
    return res.sendStatus(400);

  const films = parse(jsonDbPath);

  if (!minimumFilmDuration) return res.json(films);

  const filmsReachingMinimumDuration = films.filter((film) => film.duration >= minimumFilmDuration);
  return res.json(filmsReachingMinimumDuration);
});

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const films = parse(jsonDbPath);

  const indexOfFilmFound = films.findIndex((film) => film.id === id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(films[indexOfFilmFound]);
});

// Create a film
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

  const films = parse(jsonDbPath);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = { id: nextId, title, link, duration, budget };

  films.push(newFilm);

  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

// Delete a film
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const films = parse(jsonDbPath);
  const indexOfFilmFound = films.findIndex((film) => film.id === id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const itemsRemoved = films.splice(indexOfFilmFound, 1);
  const itemRemoved = itemsRemoved[0];

  serialize(jsonDbPath, films);

  return res.json(itemRemoved);
});

// Update a film identified by its id
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const id = parseInt(req.params.id, 10);

  if (
    !req.body ||
    (title && !title.trim()) ||
    (link && !link.trim()) ||
    (duration && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const films = parse(jsonDbPath);
  const indexOfFilmFound = films.findIndex((film) => film.id === id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const filmPriorToChange = films[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  films[indexOfFilmFound] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

module.exports = router;
