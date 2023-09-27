const movies = [];

const readAllMovies = () => fetch('/api/films').then((res) => res.json());

const addOneMovie = (movie) => movies.push(movie);

export { readAllMovies, addOneMovie };