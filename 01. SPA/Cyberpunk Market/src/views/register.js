import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { register } from '../data/auth.js';
import { showErrMsg } from './notification.js';

const registerTemplate = (actionReg) => html`
  <section id="register">
    <div class="form" @submit=${actionReg}>
      <h2>Register</h2>
      <form class="register-form">
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

async function onRegister(data, form) {
  if (!data['email'] || !data['password']) {
    return showErrMsg('All fields are required');
  }

  if (data['password'] !== data['re-password']) {
    return showErrMsg('Passwords don\'t match');
  }

  await register(data['email'], data['password']);

  page.redirect('/');
}

export function showRegister(ctx) {
  ctx.render(registerTemplate(submitForm(onRegister)));
}