import { html, render } from '../libs.js';

const navTemplate = (userData) => {
  const user = html`
    <div class="user">
      <a href="/add">Add Character</a>
      <a href="/logout">Logout</a>
    </div>
  `;

  const guest = html`
    <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  `;

  return html`
    <a id="logo" href="/">
      <img id="logo-img" src="./images/logo.png" alt="" />
    </a>
    <nav>
      <div>
        <a href="/characters">Characters</a>
      </div>
      ${userData ? user : guest}
    </nav>
  `;
}

export function showNav(ctx, next) {
  const userData = ctx.userData;

  render(navTemplate(userData), document.querySelector('header'));

  next();
}