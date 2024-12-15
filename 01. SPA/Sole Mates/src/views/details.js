import { html, page } from '../libs.js';
import { deleteData, readDataById } from '../data/crud.js';

const detailsTemplate = (pair, gotUser, isOwner, onDelete) => {
  const actionBtns = html`
    <div id="action-buttons">
      <a href="/edit/${pair._id}" id="edit-btn">Edit</a>
      <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
    </div>
  `;

  return html`
    <section id="details">
      <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
          <img src=${pair.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
          <p>Brand: <span id="details-brand">${pair.brand}</span></p>
          <p>
            Model: <span id="details-model">${pair.model}</span>
          </p>
          <p>Release date: <span id="details-release">${pair.release}</span></p>
          <p>Designer: <span id="details-designer">${pair.designer}</span></p>
          <p>Value: <span id="details-value">${pair.value}</span></p>
        </div>
        ${gotUser ? html`${isOwner ? actionBtns : null}` : null}
      </div>
    </section>
  `;
}

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const userData = ctx.userData;

  const pair = await readDataById(id);
  const gotUser = !!userData;
  const isOwner = gotUser && userData._id === pair._ownerId;

  ctx.render(detailsTemplate(pair, gotUser, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this pair?');

    if (choice) {
      await deleteData(id);

      page.redirect('/dashboard');
    }
  }
}