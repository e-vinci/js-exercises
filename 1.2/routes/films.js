var express = require('express');
var router = express.Router();

const films = [
  {
    id: 1,
    title: 'Star Wars: The Phantom Menace (Episode I)',
    duration: 136,
    budget: '115',
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
  },
  {
    id: 2,
    title: 'Star Wars: Episode II – Attack of the Clones',
    duration: 142,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
  },
  {
    id: 3,
    title: "Zack Snyder's Justice League",
    duration: 242,
    budget: 70,
    link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
  },
];

// Read all the films
router.get('/', function (req, res) {
  return res.json(films);
});

module.exports = router;
