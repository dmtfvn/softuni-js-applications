import { html, render, page } from '../libs.js';
import { submitHandler } from '../utils.js';
import { getMovieById, updateMovie } from '../data/crud.js';

const editTemplate = (movie, onEdit) => html`
  <section id="edit-movie" class="view-section">
    <form class="text-center border border-light p-5" action="#" method="" @submit=${onEdit}>
      <h1>Edit Movie</h1>
      <div class="form-group">
        <label for="title">Movie Title</label>
        <input id="title" type="text" class="form-control" placeholder="Movie Title" value="${movie.title}" name="title" />
      </div>
      <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Movie Description..." name="description">${movie.description}</textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" value="${movie.img}" name="img" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
`;

export async function showEdit(ctx) {
  const id = ctx.params.id;

  const movie = await getMovieById(id);

  render(editTemplate(movie, submitHandler(onEdit)));

  async function onEdit({ title, description, img }, form) {
    if (!title || !description || !img) {
      form.reset();

      return alert('All fields are required!');
    }

    await updateMovie(id, { title, description, img });

    page.redirect('/' + id);
  }
}