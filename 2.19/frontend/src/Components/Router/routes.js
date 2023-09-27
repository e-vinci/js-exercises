import AboutPage from '../Pages/AboutPage';
import AddMoviePage from '../Pages/AddMoviePage';
import HomePage from '../Pages/HomePage';
import ViewMoviePage from '../Pages/ViewMoviePage';

const routes = {
  '/': HomePage,
  '/movies': ViewMoviePage,
  '/movies/add': AddMoviePage,
  '/about': AboutPage,
};

export default routes;
