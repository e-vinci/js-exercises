import FilmLibrary from "../../Domain/FilmLibrary";
import { getSessionObject } from "../../utils/session";

window.callRef = -1; // Global variable that will be used in the router to stop interval calls

const mooviePage = `
<div class="text-center">
  <h3>Moovies</h3>

  <p>Here you can find all moovies</p>  
  <div id="printMoovies"></div>  
</div>`;

window.myFilmLibrary = new FilmLibrary();

const MooviePage = () => {
  const main = document.querySelector("main");
  main.innerHTML = mooviePage;
  renderFilms();
  callRef = setInterval(renderFilms, 5000); // re-render the films every 5s
};

async function renderFilms() {
  const user = getSessionObject("user");
  const printMoovies = document.querySelector("#printMoovies");

  printMoovies.innerHTML = await window.myFilmLibrary.getHtmlTable(user);
  // add event listeners to deal with delete & save operations
  printMoovies.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      const elementId = e.target.dataset.elementId;
      window.myFilmLibrary.deleteFilm(user, elementId);
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
      window.myFilmLibrary.updateFilm(user, elementId, newFilmData);
      callRef = setInterval(renderFilms, 5000); // re-render the films every 5s
    });
  });

  // deal with update of td contents : cancel the re-renders of films
  printMoovies.querySelectorAll("td").forEach((td) => {
    td.addEventListener("input", () => {
      clearInterval(callRef);
    });
  });
}

export default MooviePage;
