import { html } from '../../node_modules/lit-html/lit-html.js';
import { createTeam } from '../api/data.js';

const createTemplate = (onSubmit, errorMessage) => html`
  <section id="create">
    <article class="narrow">
      <header class="pad-med">
        <h1>New Team</h1>
      </header>
      <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
        ${errorMessage ? html`<div class="error">${errorMessage}</div>` : ''}
        <label>Team name: <input type="text" name="name"></label>
        <label>Logo URL: <input type="text" name="logoUrl"></label>
        <label>Description: <textarea name="description"></textarea></label>
        <input class="action cta" type="submit" value="Create Team">
      </form>
    </article>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get('name');
    const logo = formData.get('logoUrl');
    const description = formData.get('description');

    [...e.target.querySelectorAll('input')].forEach(i => i.disabled = true);

    try {
      if (name.length < 4) {
        throw new Error('Team name must be at least 4 characters long!');
      }

      if (description.length < 10) {
        throw new Error('Description must be atleast 10 characters long!');
      }

      if (logo == '') {
        throw new Error('Team logo is required!');
      }

      const team = await createTeam({ name, description, logo });

      e.target.reset();

      ctx.page.redirect('/details/' + team._id);
    } catch (error) {
      ctx.render(createTemplate(onSubmit, error.message));
    } finally {
      [...e.target.querySelectorAll('input')].forEach(i => i.disabled = false);
    }
  }
}