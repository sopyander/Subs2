import HomePage from '../pages/home-page.js';
import AboutPage from '../pages/about-page.js';
import AddStoryPage from '../pages/add-story-page.js';
import LoginPage from '../pages/login-page.js';
import RegisterPage from '../pages/register-page.js';

const routes = {
  '/': new HomePage(),
  '/home': new HomePage(),
  '/about': new AboutPage(),
  '/add-story': new AddStoryPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
};

export default routes;