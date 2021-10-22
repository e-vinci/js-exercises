import { Navbar as BootstrapNavbar } from "bootstrap";
import HomePage from "../Pages/HomePage";
import MooviePage from "../Pages/MooviePage";

const navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-success">
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
        <a class="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li id="loginItem" class="nav-item">
        <a class="nav-link" href="#">Moovies</a>
      </li>               
    </ul>
  </div>
</div>
</nav>`;

const Navbar = () => {
  const header = document.querySelector("header");
  header.innerHTML += navbar;
  const navItems = document.querySelectorAll(".nav-link");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // stop default action of a link
      e.preventDefault();
      console.log(`click on ${e.target.innerHTML} navbar item`);
      if (e.target.innerHTML === "Home") {
        HomePage();
      } else if (e.target.innerHTML === "Moovies") {
        MooviePage();
      }
    });
  });
};

export default Navbar;
