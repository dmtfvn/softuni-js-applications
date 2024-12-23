import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../utils.js';

const navWrapper = document.querySelector('.navbar');

const navTemplate = () => html`
  <a class="navbar-brand text-light" href="/">Movies</a>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item user">
      <a class="nav-link" id="welcome-msg">Welcome, email</a>
    </li>
    <li class="nav-item user">
      <a class="nav-link" href="/logout">Logout</a>
    </li>
    <li class="nav-item guest">
      <a class="nav-link" href="/login">Login</a>
    </li>
    <li class="nav-item guest">
      <a class="nav-link" href="/register">Register</a>
    </li>
  </ul>
`;

export function showNav(ctx) {
  render(navTemplate(), navWrapper);
}

export function updateNav() {
  const userData = getUserData();

  document.querySelectorAll('.user').forEach(e => {
    e.style.display = userData ? 'inline' : 'none';
  });

  document.querySelectorAll('.guest').forEach(e => {
    e.style.display = userData ? 'none' : 'inline';
  });

  document.querySelector('#welcome-msg').textContent = userData
    ? `Welcome, ${userData.email}`
    : null;
}