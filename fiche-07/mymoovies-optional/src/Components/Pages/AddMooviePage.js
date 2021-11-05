import Film from "../../Domain/Film";
import FilmLibrary from "../../Domain/FilmLibrary";
import { getSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";

const addMooviePage = `
<div class="text-center">
  <h3>Add a moooooovie ; )</h3> 

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
</div>`;

const myFilmLibrary = new FilmLibrary();

const AddMooviePage = async () => {
  // Redirect user to login page if not authenticated
  const user = getSessionObject("user");
  if (!user) return Redirect("/login");

  const main = document.querySelector("main");
  main.innerHTML = addMooviePage;
  const myForm = document.querySelector("form");
 

  myForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let newFilm = new Film(
      title.value,
      parseInt(duration.value),
      parseInt(budget.value),
      link.value
    );

    const filmAdded = await myFilmLibrary.addFilm(newFilm, user);    
    // clear form inputs
    myForm.reset();
  });
};

export default AddMooviePage;
