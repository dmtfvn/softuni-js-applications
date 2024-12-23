import { html, render, page } from '../libs.js';
import { submitHandler } from '../utils.js';
import { login } from '../data/auth.js';
import { updateNav } from './nav.js';

const loginTemplate = (onLogin) => html`
  <section id="form-login" class="view-section">
    <form id="login-form" class="text-center border border-light p-5" action="" method="" @submit=${onLogin}>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" autocomplete="on" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
`;

async function onLogin({ email, password }, form) {
  if (!email || !password) {
    form.reset();

    return alert('All fields are required!');
  }

  await login(email, password);

  updateNav();
  page.redirect('/');
}

export function showLogin(ctx) {
  render(loginTemplate(submitHandler(onLogin)));
}