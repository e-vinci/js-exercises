import anime from 'animejs/lib/anime.es';
import grootImage from '../../img/groot.jpg';
import stormtrooperImage from '../../img/stormtrooper.jpg';

const HomePage = () => {
  const homePage = `
  <div class="container text-center no-scroll">
          <div class="row">
            <div class="col">
              <h3>Welcome to myMovies !</h3>

              <p>Here you can find a selection of our favorite movies ; )</p>
            </div>
          </div>          

          <div class="row">
            <div id="groot" class="col-12 col-lg-6 clickable">
              <img class="img-thumbnail" src="${grootImage}" alt="Groot" />
            </div>

            <div id="stormtrooper" class="col-12 col-lg-6 clickable">
              <img class="img-thumbnail" src="${stormtrooperImage}" alt="Stormtrooper" />
            </div>
          </div>
  </div>`;

  const main = document.querySelector('main');
  main.innerHTML = homePage;

  anime({
    targets: ['#groot'],
    scale: 0.5,
    duration: 2000,
    direction: 'alternate',
    easing: 'linear',
    rotate: '5turn',
  });

  anime({
    targets: ['#stormtrooper'],
    scale: 0.5,
    duration: 2000,
    direction: 'alternate',
    easing: 'linear',
    rotate: '-5turn',
  });

  const groot = document.querySelector('#groot');
  groot.addEventListener('click', () => {
    anime({
      targets: groot,
      scaleX: -1, // Flip horizontally
      duration: 1000, // Animation duration in milliseconds
      easing: 'easeInOutQuad', // Easing function
      direction: 'alternate', // Make it flip back to original state
    });
  });

  const stormtrooper = document.querySelector('#stormtrooper');
  stormtrooper.addEventListener('click', () => {
    anime({
      targets: stormtrooper,
      scaleX: -1, // Flip horizontally
      duration: 1000, // Animation duration in milliseconds
      easing: 'easeInOutQuad', // Easing function
      direction: 'alternate', // Make it flip back to original state
    });
  });
};

export default HomePage;
