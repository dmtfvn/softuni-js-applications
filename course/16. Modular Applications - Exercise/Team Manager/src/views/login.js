import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js'

const loginTemplate = (onSubmit, errorMessage) => html`
  <section id="login">
    <article class="narrow">
      <header class="pad-med">
        <h1>Login</h1>
      </header>
      <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
        ${errorMessage ? html`<div class="error">${errorMessage}</div>` : ''}
        <label>E-mail: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <input class="action cta" type="submit" value="Sign In">
      </form>
      <footer class="pad-small">
        Don't have an account? <a href="/register" class="invert">Sign up here</a>
      </footer>
    </article>
  </section>
`;

export async function loginPage(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await login(email, password);

      ctx.setUserNav();
      ctx.page.redirect('/');
    } catch (error) {
      ctx.render(loginTemplate(onSubmit, error.message));
    }
  }
}