import { html, render, page } from '../libs.js';
import { deleteMovie, getMovieById } from '../data/crud.js';
import { getUserData } from '../utils.js';
import { addLike, showLikesCountPerMovie, showLikesFromUser } from '../data/likes.js';

const detailsTemplate = (data, gotUser, isOwner, likesTotal, likesFromUser, onDelete, onAddLike) => {
  const deleteEditBtns = html`
    <a class="btn btn-danger" href="javascript:void(0)" @click=${onDelete}>Delete</a>
    <a class="btn btn-warning" href="/edit/${data._id}">Edit</a>
  `;

  const likeBtn = html`
    <a class="btn btn-primary" href="javascript:void(0)" @click=${onAddLike}>Like</a>
  `;

  return html`
    <section id="movie-example" class="view-section">
      <div class="container">
        <div class="row bg-light text-dark">
          <h1>Movie title: ${data.title}</h1>
          <div class="col-md-8">
            <img class="img-thumbnail" src="${data.img}"
              alt="Movie" />
          </div>
          <div class="col-md-4 text-center">
            <h3 class="my-3">Movie Description</h3>
            <p>
              ${data.description}
            </p>
            ${gotUser ? html`
                ${isOwner ? deleteEditBtns : (!likesFromUser ? likeBtn : null)}
              ` : null}
              <span class="enrolled-span">Liked ${likesTotal}</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function showDetails(ctx) {
  const id = ctx.params.id;

  const request = [
    getMovieById(id),
    showLikesCountPerMovie(id)
  ];

  const user = getUserData();

  if (user) {
    request.push(showLikesFromUser(id, user._id));
  }

  const [movie, likesTotal, likesFromUser] = await Promise.all(request);

  const gotUser = !!user;
  const isOwner = gotUser && user._id === movie._ownerId;

  render(detailsTemplate(movie, gotUser, isOwner, likesTotal, likesFromUser, onDelete, onAddLike));

  async function onDelete() {
    await deleteMovie(id);

    page.redirect('/');
  }

  async function onAddLike() {
    await addLike(id);

    page.redirect(`/${id}`);
  }
}