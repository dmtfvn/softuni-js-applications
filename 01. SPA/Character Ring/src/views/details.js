import { html, page } from '../libs.js';
import { deleteData, readDataById } from '../data/crud.js';
import { addLike, showLikerPerUser, showLikesTotalCount } from '../data/likes.js';

const detailsTemplate = (character, gotUser, isOwner, likesTotal, likesPerUser, onDelete, onLike) => {
  const editDeketeBtns = html`
    <a href="/edit/${character._id}" id="edit-btn">Edit</a>
    <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
  `;

  const likeBtn = html`
    <a href="javascript:void(0)" id="like-btn" @click=${onLike}>Like</a>
  `;

  return html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${character.imageUrl} alt="example1" />
      <div>
        <p id="details-category">${character.category}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${character.description}</p>
            <p id="more-info">${character.moreInfo}</p>
          </div>
        </div>
        <h3>Is This Useful:<span id="likes">${likesTotal}</span></h3>
        <div id="action-buttons">
          ${gotUser ? html`${isOwner ? editDeketeBtns : (!likesPerUser ? likeBtn : null)}` : null}
        </div>
      </div>
    </div>
  </section>
  `;
}

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const userData = ctx.userData;

  const request = [
    readDataById(id),
    showLikesTotalCount(id)
  ];

  if (userData) {
    request.push(showLikerPerUser(id, userData._id));
  }

  const [character, likesTotal, likesPerUser] = await Promise.all(request);

  const gotUser = !!userData;
  const isOwner = gotUser && userData._id == character._ownerId;

  ctx.render(detailsTemplate(character, gotUser, isOwner, likesTotal, likesPerUser, onDelete, onLike));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this character?');

    if (choice) {
      await deleteData(id);

      page.redirect('/characters');
    }
  }

  async function onLike() {
    await addLike(id);

    page.redirect(`/details/${id}`);
  }
}