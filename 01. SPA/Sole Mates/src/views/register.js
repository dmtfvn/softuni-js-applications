import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { register } from '../data/auth.js';

const registerTemplate = (actionRegister) => html`
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="login-form" @submit=${actionRegister}>
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">login</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

async function onRegister(data, form) {
  if (Object.values(data).some(el => el === '')) {
    return alert('All fields are required');
  }

  if (data['password'] !== data['re-password']) {
    return alert('Passwords don\'t match');
  }

  await register(data['email'], data['password']);

  page.redirect('/dashboard');
}

export function showRegister(ctx) {
  ctx.render(registerTemplate(submitForm(onRegister)));
}