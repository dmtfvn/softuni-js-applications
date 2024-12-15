import { html, render, page } from '../libs.js';
import { submitHandler } from '../utils.js';
import { createMovie } from '../data/crud.js';

const createTemplate = (onCreate) => html`
  <section id="add-movie" class="view-section">
    <form id="add-movie-form" class="text-center border border-light p-5" action="#" method="" @submit=${onCreate}>
      <h1>Add Movie</h1>
      <div class="form-group">
        <label for="title">Movie Title</label>
        <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="" />
      </div>
      <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea id="description" class="form-control" placeholder="Description" name="description"></textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="img" value="" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
`;

async function onCreate({ title, description, img }, form) {
  if (!title || !description || !img) {
    form.reset();

    return alert('All fields are required!');
  }

  await createMovie(title, description, img);

  page.redirect('/');
}

export function showCreate(ctx) {
  render(createTemplate(submitHandler(onCreate)));
}