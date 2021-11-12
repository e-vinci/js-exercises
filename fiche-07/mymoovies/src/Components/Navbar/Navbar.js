import { Navbar as BootstrapNavbar } from "bootstrap";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  // Get the user object from the localStorage
  let user = getSessionObject("user");

  if (!user) {
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">myMoovies</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/moovies">Moovies</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/register">Register</a>
              </li>            
            </ul>
          </div>
        </div>
      </nav>
  `;
  } else {
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">myMoovies</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
              </li> 
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/moovies">Moovies</a>
              </li>   
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/moovies/add">Add a moovie</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/logout">Logout</a>
              </li>
              <li class="nav-item">
              <a class="nav-item nav-link disabled" href="#">${user.username}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  `;
  }
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;

