import grootImage from '../../img/groot.jpg';
import stormtrooperImage from '../../img/stormtrooper.jpg';

const HomePage = () => {
  
  const homePage = `
  <div class="container text-center">
          <div class="row">
            <div class="col">
              <h3>Welcome to myMovies !</h3>

              <p>Here you can find a selection of our favorite movies ; )</p>
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

  const main = document.querySelector('main');
  main.innerHTML = homePage;
};

export default HomePage;
