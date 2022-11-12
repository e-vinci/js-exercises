import { getAuthenticatedUser } from '../utils/auths';

const readAllMovies = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/films`);

    if (!response.ok) {
      throw new Error(`readAllMovies:: fetch error : ${response.status} : ${response.statusText}`);
    }
    const films = await response.json();
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

    const response = await fetch(`${process.env.API_BASE_URL}/films`, options);

    if (!response.ok) {
      throw new Error(`addOneMovie :: fetch error : ${response.status} : ${response.statusText}`);
    }
    const createdFilm = await response.json();

    return createdFilm;
  } catch (err) {
    console.error('addOneMovie::error: ', err);
    throw err;
  }
};

async function deleteOneMovie(id) {
  if (!id) return undefined;

  try {
    const authenticatedUser = getAuthenticatedUser();

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authenticatedUser.token,
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/films/${id}`, options);

    if (!response.ok) {
      throw new Error(`deleteOneFilm :: fetch error : ${response.status} : ${response.statusText}`);
    }
    const deletedFilm = await response.json();
    return deletedFilm;
  } catch (err) {
    console.error('deleteOneMovie::error: ', err);
    throw err;
  }
}

async function updateOneMovie(id, newMovieData) {
  if (!id || !newMovieData) return undefined;

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

    const response = await fetch(`${process.env.API_BASE_URL}/films/${id}`, options); // fetch return a promise => we wait for the response

    if (!response.ok) {
      throw new Error(
        `updateOneMovie :: fetch error : ${response.status} : ${response.statusText}`,
      );
    }
    const updatedFilm = await response.json(); // json() returns a promise => we wait for the data

    return updatedFilm;
  } catch (err) {
    console.error('updateOneMovie::error: ', err);
    throw err;
  }
}

export { readAllMovies, addOneMovie, deleteOneMovie, updateOneMovie };
