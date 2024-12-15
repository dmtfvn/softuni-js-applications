import { html, page } from '../libs.js';
import { deleteData, readDataById } from '../data/crud.js';

const detailsTemplate = (drone, gotUser, isOwner, onDelete) => {
  const actionBtns = html`
    <div class="buttons">
      <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
      <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
    </div>
  `;

  return html`
    <section id="details">
      <div id="details-wrapper">
        <div>
          <img id="details-img" src=${drone.imageUrl} alt="example1" />
          <p id="details-model">${drone.model}</p>
        </div>
        <div id="info-wrapper">
          <div id="details-description">
            <p class="details-price">Price: €${drone.price}</p>
            <p class="details-condition">Condition: ${drone.condition}</p>
            <p class="details-weight">Weight: ${drone.weight}g</p>
            <p class="drone-description">${drone.description}</p>
            <p class="phone-number">Phone: ${drone.phone}</p>
          </div>
          ${gotUser ? html`${isOwner ? actionBtns : null}` : null}
        </div>
      </div>
    </section>
  `;
}

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const userData = ctx.userData;

  const drone = await readDataById(id);
  const gotUser = !!userData;
  const isOwner = gotUser && userData._id === drone._ownerId;

  ctx.render(detailsTemplate(drone, gotUser, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this drone?');

    if (choice) {
      await deleteData(id);

      page.redirect('/marketplace');
    }
  }
}