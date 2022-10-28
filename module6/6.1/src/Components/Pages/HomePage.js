const HomePage = async () => {
  document.title = 'Read from JokeAPI';
  const main = document.querySelector('main');
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
  const joke = await response.json();
  main.innerHTML = `
  <div class="alert alert-info"> 
    <h6>${joke.category}</h6>
    <q>${joke.joke}</q>
  </div>
  `;
};

export default HomePage;
