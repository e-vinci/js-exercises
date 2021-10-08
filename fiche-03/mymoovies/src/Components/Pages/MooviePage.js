import Film from "../../Domain/Film";
import FilmLibrary from "../../Domain/FilmLibrary";

const mooviePage = `
<div class="text-center">
  <h3>Moovies</h3>

  <p>Here you can find all moovies</p>

  <form class="px-5">
            <div class="mb-3">
              <label for="title">Enter title</label>
              <input
                class="form-control"
                type="text"
                name="title"
                id="title"
                required
              />
            </div>
            <div class="mb-3">
              <label for="duration">Enter duration (minutes)</label>
              <input
                class="form-control"
                type="number"
                name="duration"
                id="duration"
                required
              />
            </div>
            <div class="mb-3">
              <label for="budget">Enter budget (million)</label>
              <input
                class="form-control"
                type="number"
                name="budget"
                id="budget"
                required
              />
            </div>
            <div class="mb-3">
              <label for="link">Enter link</label>
              <input
                class="form-control"
                type="url"
                name="link"
                id="link"
                required
              />
            </div>
            <input type="submit" class="btn btn-primary" value="Add Moovie" />
    </form>
    <div id="printMoovies"></div>
  
</div>`;

const myFilmLibrary = new FilmLibrary();

const MooviePage = () => {
  const main = document.querySelector("main");
  main.innerHTML = mooviePage;
  const myForm = document.querySelector("form");
  const printMoovies = document.querySelector("#printMoovies");
  printMoovies.innerHTML = myFilmLibrary.getHtmlTable();

  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newFilm = new Film(
      title.value,
      duration.value,
      budget.value,
      link.value
    );
    
    myFilmLibrary.addFilm(newFilm);
    // test to see if our collection is protected against change in objects
    newFilm.title = "External change to object after added to collection";    
    printMoovies.innerHTML = myFilmLibrary.getHtmlTable();
    // clear form inputs
    myForm.reset();
  });
};

export default MooviePage;
