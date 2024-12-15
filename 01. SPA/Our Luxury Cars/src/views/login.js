import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { login } from '../data/auth.js';

const loginTemplate = (actionLogin) => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${actionLogin}>
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
  if (Object.values(data).some(el => el === '')) {
    return alert('All fields are required');
  }

  await login(data['email'], data['password']);

  page.redirect('/');
}

export function showLogin(ctx) {
  ctx.render(loginTemplate(submitForm(onLogin)));
}