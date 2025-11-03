import routes from './routes/routes.js';
import { getActiveRoute } from './routes/url-parser.js';
import './components/loading-indicator.js';
import PushNotification from './utils/push-notification-helper.js'; // 🔔 Import helper

export default class App {
  constructor({ content }) {
    this.content = content;

    this.logoutHandler = this.logout.bind(this);
    this._initNotificationButton(); 
  }

  _initNotificationButton() {
    document.addEventListener('DOMContentLoaded', () => {
      const notificationBtn = document.getElementById('notificationBtn');
      if (notificationBtn) {
        notificationBtn.addEventListener('click', async () => {
          try {
            await PushNotification.requestPermission();
          } catch (err) {
            console.error('Gagal meminta izin notifikasi:', err);
          }
        });
      } else {
        console.warn('Tombol notifikasi (#notificationBtn) tidak ditemukan di DOM.');
      }
    });
  }

  async init() {
    this.updateHeader();
    await this.render();
  }

  updateHeader() {
    const token = localStorage.getItem('story_token');
    const loginLink = document.getElementById('login-link');
    const addStoryLink = document.querySelector('a[href="#/add-story"]');

    if (!loginLink) return;

    loginLink.removeEventListener('click', this.logoutHandler);

    if (token) {
      loginLink.textContent = 'Logout';
      loginLink.removeAttribute('href');
      loginLink.style.cursor = 'pointer';
      addStoryLink && (addStoryLink.style.display = 'inline');
      loginLink.addEventListener('click', this.logoutHandler);
    } else {
      loginLink.textContent = 'Login';
      loginLink.setAttribute('href', '#/login');
      loginLink.style.cursor = 'pointer';
      addStoryLink && (addStoryLink.style.display = 'none');
    }
  }

  logout(event) {
    event.preventDefault();
    localStorage.removeItem('story_token');
    this.updateHeader();
    window.location.hash = '/';
  }

  async render() {
    this.updateHeader();

    const url = getActiveRoute();
    const page = routes[url] || routes['/'];

    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        this.content.innerHTML = await page.render();
        if (page.afterRender) await page.afterRender();
        this.content.querySelector('.page-content')?.focus();
      });
    } else {
      this.content.innerHTML = '<loading-indicator></loading-indicator>';
      this.content.innerHTML = await page.render();
      if (page.afterRender) await page.afterRender();
      this.content.querySelector('.page-content')?.focus();
    }
  }
}
