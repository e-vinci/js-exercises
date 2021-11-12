import HomePage from "../Pages/HomePage";
import MooviePage from "../Pages/MooviePage";
import AddMooviePage from "../Pages/AddMooviePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Logout from "../Logout/Logout";
// Configure your routes here
const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/moovies": MooviePage,
  "/moovies/add": AddMooviePage,
  "/logout": Logout,
};

/**
 * Deal with call and auto-render of Functional Components following click events
 * on Navbar, Load / Refresh operations, Browser history operation (back or next) or redirections.
 * A Functional Component is responsible to auto-render itself : Pages, Header...
 */

const Router = () => {
  /* Manage click on the Navbar */
  let navbarWrapper = document.querySelector("#navbarWrapper");
  navbarWrapper.addEventListener("click", (e) => {
    // To get a data attribute through the dataset object, get the property by the part of the attribute name after data- (note that dashes are converted to camelCase).
    let uri = e.target.dataset.uri;
    stopIntervalCalls(uri);

    if (uri) {
      e.preventDefault();
      /* use Web History API to add current page URL to the user's navigation history 
       & set right URL in the browser (instead of "#") */
      window.history.pushState({}, uri, window.location.origin + uri);
      /* render the requested component
      NB : for the components that include JS, we want to assure that the JS included 
      is not runned when the JS file is charged by the browser
      therefore, those components have to be either a function or a class*/
      const componentToRender = routes[uri];
      if (routes[uri]) {
        componentToRender();
      } else {
        throw Error("The " + uri + " ressource does not exist");
      }
    }
  });

  function stopIntervalCalls(uri) {
    console.log("callRef: ", window.callRef);
    if (window.callRef && window.callRef !== -1) {
      clearInterval(window.callRef);
      if (window.myFilmLibrary & (uri !== "/moovies"))
        window.myFilmLibrary.abortFetch();

      window.callRef = -1;
    }
  }

  /* Route the right component when the page is loaded / refreshed */
  window.addEventListener("load", (e) => {
    const componentToRender = routes[window.location.pathname];
    if (!componentToRender)
      throw Error(
        "The " + window.location.pathname + " ressource does not exist."
      );

    componentToRender();
  });

  // Route the right component when the user use the browsing history
  window.addEventListener("popstate", () => {
    const componentToRender = routes[window.location.pathname];
    componentToRender();
  });
};

/**
 * Call and auto-render of Functional Components associated to the given URL
 * @param {*} uri - Provides an URL that is associated to a functional component in the
 * routes array of the Router
 */

const Redirect = (uri) => {
  // use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
  window.history.pushState({}, uri, window.location.origin + uri);
  // render the requested component
  const componentToRender = routes[uri];
  if (routes[uri]) {
    componentToRender();
  } else {
    throw Error("The " + uri + " ressource does not exist");
  }
};

export { Router, Redirect };
