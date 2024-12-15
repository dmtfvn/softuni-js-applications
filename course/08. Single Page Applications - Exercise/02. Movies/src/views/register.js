import { html, render, page } from '../libs.js';
import { submitHandler } from '../utils.js';
import { register } from '../data/auth.js';
import { updateNav } from './nav.js';

const registerTemplate = (onRegister) => html`
  <section id="form-sign-up" class="view-section">
    <form id="register-form" class="text-center border border-light p-5" action="" method="" @submit=${onRegister}>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" autocomplete="on" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
      </div>

      <div class="form-group">
        <label for="repeatPassword">Repeat Password</label>
        <input id="repeatPassword" type="password" class="form-control" placeholder="Repeat-Password"
          name="repeatPassword" value="" />
      </div>

      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </section>
`;

async function onRegister({ email, password, repeatPassword }, form) {
  if (!email || !password) {
    form.reset();

    return alert('All fields are required!');
  }

  if (password.length < 6) {
    form.reset();

    return alert('Password should be at least 6 characters long!');
  }

  if (password !== repeatPassword) {
    form.reset();

    return alert('Passwords don\'t match!');
  }

  await register(email, password);

  updateNav();
  page.redirect('/');
}

export function showRegister(ctx) {
  render(registerTemplate(submitHandler(onRegister)));
}