import { getAuthenticatedUser } from '../utils/auths';

const readAllMovies = async () => {
  try {
    const res = await fetch('/api/films');
    const films = await res.json();
    return films;
  } catch (err) {
    console.error('readAllMovies::error: ', err);
    throw err;
  }
};

const addOneMovie = async (movie) => {
  try {
    const authenticatedUser = getAuthenticatedUser();
    const options = {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authenticatedUser.token,
      },
    };

    const response = await fetch('/api/films', options);

    const createdFilm = await response.json();

    return createdFilm;
  } catch (err) {
    console.error('addOneMovie::error: ', err);
    throw err;
  }
};

const deleteOneMovie = async (id) => {
  try {
    const authenticatedUser = getAuthenticatedUser();

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: authenticatedUser.token,
      },
    };

    const response = await fetch(`/api/films/${id}`, options);

    const deletedFilm = await response.json();

    return deletedFilm;
  } catch (err) {
    console.error('deleteOneMovie::error: ', err);
    throw err;
  }
};

const updateOneMovie = async (id, newMovieData) => {
  try {
    const authenticatedUser = getAuthenticatedUser();

    const options = {
      method: 'PATCH',
      body: JSON.stringify(newMovieData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authenticatedUser.token,
      },
    };

    const response = await fetch(`/api/films/${id}`, options);

    const updatedFilm = await response.json();

    return updatedFilm;
  } catch (err) {
    console.error('updateOneMovie::error: ', err);
    throw err;
  }
};

export { readAllMovies, addOneMovie, deleteOneMovie, updateOneMovie };
