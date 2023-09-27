const movies = [];

const readAllMovies = () => fetch('http://localhost:3000/films').then((res) => res.json());

const addOneMovie = (movie) => movies.push(movie);

export { readAllMovies, addOneMovie };