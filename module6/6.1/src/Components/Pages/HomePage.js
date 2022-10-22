const HomePage = async () => {
  document.title = 'Read from Animechan';
  const main = document.querySelector('main');
  const response = await fetch('https://animechan.vercel.app/api/random');
  const quote = await response.json();
  main.innerHTML = `
  <div class="alert alert-info"> 
    <h5>${quote.anime}</h5>
    <h6>${quote.character}</h6>
    <q>${quote.quote}</q>
  </div>
  `;
};

export default HomePage;
