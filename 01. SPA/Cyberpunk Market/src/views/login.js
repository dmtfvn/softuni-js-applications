import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { login } from '../data/auth.js';
import { showErrMsg } from './notification.js';

const loginTemplate = (actionLogin) => html`
  <section id="login">
    <div class="form" @submit=${actionLogin}>
      <h2>Login</h2>
      <form class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`;

async function onLogin(data, form) {
  if (!data['email'] || !data['password']) {
    return showErrMsg('All fields are required');
  }

  await login(data['email'], data['password']);

  page.redirect('/');
}

export function showLogin(ctx) {
  ctx.render(loginTemplate(submitForm(onLogin)));
}