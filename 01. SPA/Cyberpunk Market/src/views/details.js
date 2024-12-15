import { html, page } from '../libs.js';
import { deleteData, readDataById } from '../data/crud.js';

const detailsTemplate = (item, gotUser, isOwner, onDelete) => {
  const editDeleteBtns = html`
    <div id="action-buttons">
      <a href="/edit/${item._id}" id="edit-btn">Edit</a>
      <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
    </div>
  `;

  return html`
  <section id="details">
    <div id="details-wrapper">
      <div>
        <img id="details-img" src="${item.imageUrl}" alt="example1" />
        <p id="details-title">${item.item}</p>
      </div>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="details-price">Price: €${item.price}</p>
          <p class="details-availability">${item.availability}</p>
          <p class="type">Type: ${item.type}</p>
          <p id="item-description">${item.description}</p>
        </div>
        ${gotUser ? html`${isOwner ? editDeleteBtns : null}` : null}
      </div>
    </div>
  </section>
  `;
}

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const userData = ctx.userData;

  const item = await readDataById(id);
  const gotUser = !!userData;
  const isOwner = gotUser && userData._id === item._ownerId;

  ctx.render(detailsTemplate(item, gotUser, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this item?');

    if (choice) {
      await deleteData(id);

      page.redirect('/market');
    }
  }
}