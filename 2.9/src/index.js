import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import grootImage from './img/groot.jpg';
import stormtrooperImage from './img/stormtrooper.jpg';

const main = document.querySelector('main');

renderHomePage();

function renderHomePage() {
  const homePage = `
  <div class="container text-center">
          <div class="row">
            <div class="col">
              <h3>Welcome to myMovies !</h3>

              <p>Here you can find a selection of our favorite movies ; )</p>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <button type="button" class="btn btn-dark">About</button>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <img class="img-thumbnail" src="${grootImage}" alt="Groot" />
            </div>

            <div class="col-12 col-lg-6">
              <img class="img-thumbnail" src="${stormtrooperImage}" alt="Stormtrooper" />
            </div>
          </div>
  </div>`;

  main.innerHTML = homePage;
  const button = document.querySelector('button');
  button.addEventListener('click', renderAboutPage);
}

function renderAboutPage() {
  const aboutPage = `
  <div class="container text-center">
          <div class="row">
            <div class="col">
              <h3>About e-baron...</h3>

              <p>He is a teacher at Vinci who enjoys coding in JS...</p>
            </div>
          </div>  
          <div class="row mb-3">
            <div class="col">
              <button type="button" class="btn btn-dark">Back</button>
            </div>
          </div>        
  </div>`;
  main.innerHTML = aboutPage;
  const button = document.querySelector('button');
  button.addEventListener('click', renderHomePage);
}
