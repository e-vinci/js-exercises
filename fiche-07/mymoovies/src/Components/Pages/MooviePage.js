import Film from "../../Domain/Film";
import FilmLibrary from "../../Domain/FilmLibrary";
import { getSessionObject } from "../../utils/session";

const mooviePage = `
<div class="text-center">
  <h3>Moovies</h3>

  <p>Here you can find all moovies</p>  
  <div id="printMoovies"></div>  
</div>`;

const myFilmLibrary = new FilmLibrary();

const MooviePage = async () => {
  const user = getSessionObject("user");
  const main = document.querySelector("main");
  main.innerHTML = mooviePage;
  const printMoovies = document.querySelector("#printMoovies");
  printMoovies.innerHTML = await myFilmLibrary.getHtmlTable(user);
  // add event listeners to deal with delete & save operations
  printMoovies.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      const elementId = e.target.dataset.elementId;
      myFilmLibrary.deleteFilm(user, elementId);
      MooviePage();
    });
  });

  printMoovies.querySelectorAll(".update").forEach((button) => {
    button.addEventListener("click", (e) => {
      const elementId = e.target.dataset.elementId;
      // Get the data to be updated : the button is within a td which is within a tr
      const filmRow = e.target.parentElement.parentElement;
      const newFilmData = {
        title: filmRow.children[0].innerHTML,
        link: filmRow.children[1].innerText, // it's is a link that we change, not directly the td
        duration: filmRow.children[2].innerHTML,
        budget: filmRow.children[3].innerHTML,
      };
      console.log("newFilmData:", newFilmData);
      myFilmLibrary.updateFilm(user, elementId, newFilmData);
      MooviePage();
    });
  });
};

export default MooviePage;
