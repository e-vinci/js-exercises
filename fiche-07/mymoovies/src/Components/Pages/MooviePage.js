import Film from "../../Domain/Film";
import FilmLibrary from "../../Domain/FilmLibrary";

const mooviePage = `
<div class="text-center">
  <h3>Moovies</h3>

  <p>Here you can find all moovies</p>  
  <div id="printMoovies"></div>  
</div>`;

const myFilmLibrary = new FilmLibrary();

const MooviePage = async () => {
  const main = document.querySelector("main");
  main.innerHTML = mooviePage;
  const printMoovies = document.querySelector("#printMoovies");
  printMoovies.innerHTML = await myFilmLibrary.getHtmlTable();
};

export default MooviePage;
