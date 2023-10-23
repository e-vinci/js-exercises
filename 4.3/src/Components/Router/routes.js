import AboutPage from '../Pages/AboutPage';
import AddMoviePage from '../Pages/AddMoviePage';
import HomePage from '../Pages/HomePage';
import ViewMoviePage from '../Pages/ViewMoviePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/movies': ViewMoviePage,
  '/movies/add': AddMoviePage,
  '/about': AboutPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
};

export default routes;
