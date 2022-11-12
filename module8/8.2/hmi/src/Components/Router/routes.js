import AddMoviePage from '../Pages/AddMoviePage';
import HomePage from '../Pages/HomePage';
import ViewMoviePage from '../Pages/ViewMoviePage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

const routes = {
  '/': HomePage,
  '/view-movies': ViewMoviePage,
  '/add-movie': AddMoviePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
};

export default routes;
