import { deleteOneMovie, readAllMovies, updateOneMovie } from '../../models/movies';
import { isAuthenticated } from '../../utils/auths';

const ViewMoviePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper"></div>';

  const movieWrapper = document.querySelector('#movieWrapper');

  const movies = await readAllMovies();

  const moviesAsHtmlTable = getHtmlMovieTableAsString(movies);

  movieWrapper.innerHTML = moviesAsHtmlTable;

  attachEventListeners();
};

function getHtmlMovieTableAsString(movies) {
  const authenticated = isAuthenticated();

  if (movies?.length === undefined || movies.length === 0) {
    return '<p class="p-5">No movies yet : (</p>';
  }

  let htmlMovieTable = `<div class="table-responsive p-5">
  <table class="table">
<thead>
  <tr>
    <th scope="col">Title</th>
    <th scope="col">Link</th>
    <th scope="col">Duration (min)</th>
    <th scope="col">Budget (million)</th>
    ${authenticated ? '<th scope="col" colspan="2">Operations</th>' : ''}
  </tr>
</thead>
<tbody>`;

  movies.forEach((element) => {
    htmlMovieTable += `
    <tr>
      <td class="fw-bold text-info" ${authenticated ? 'contenteditable="true"' : ''}>${
      element.title
    }</td>
      <td class="text-info text-break" ${
        authenticated ? 'contenteditable="true"' : ''
      }><a class="text-info" href="${element.link}" target="_blank""> ${element.link}</a></td>
      <td class="text-info" ${authenticated ? 'contenteditable="true"' : ''}>${
      element.duration
    }</td>
      <td class="text-info" ${authenticated ? 'contenteditable="true"' : ''}>${element.budget}</td>
      ${
        authenticated
          ? `<td><button type="button" class="btn btn-info delete" data-element-id="${element.id}">Delete</button></td>
          <td><button type="button" class="btn btn-info update" data-element-id="${element.id}">Save</button></td>`
          : ''
      }
      
    </tr>
    `;
  });

  return htmlMovieTable;
}

function attachEventListeners() {
  const movieWrapper = document.querySelector('#movieWrapper');

  movieWrapper.querySelectorAll('.delete').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { elementId } = e.target.dataset;
      await deleteOneMovie(elementId);
      ViewMoviePage();
    });
  });

  movieWrapper.querySelectorAll('.update').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { elementId } = e.target.dataset;

      const filmRow = e.target.parentElement.parentElement;
      const newFilmData = {
        title: filmRow.children[0].innerText,
        link: filmRow.children[1].innerText, // it's is a link that we change, not directly the td
        duration: Number.parseInt(filmRow.children[2].innerHTML, 10),
        budget: Number.parseInt(filmRow.children[3].innerHTML, 10),
      };
      await updateOneMovie(elementId, newFilmData);
      ViewMoviePage();
    });
  });
}

export default ViewMoviePage;
