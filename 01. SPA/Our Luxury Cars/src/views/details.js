import { html, page } from '../libs.js';
import { deleteData, readDataById } from '../data/crud.js';

const detailsTemplate = (car, gotUser, isOwner, onDelete) => {
  const actionBtns = html`
    <div id="action-buttons">
      <a href="/edit/${car._id}" id="edit-btn">Edit</a>
      <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
    </div>
  `;

  return html`
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src=${car.imageUrl} alt="example1" />
        <p id="details-title">${car.model}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p class="price">Price: €${car.price}</p>
            <p class="weight">Weight: ${car.weight} kg</p>
            <p class="top-speed">Top Speed: ${car.speed} kph</p>
            <p id="car-description">${car.about}</p>
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

  const car = await readDataById(id);
  const gotUser = !!userData;
  const isOwner = gotUser && userData._id === car._ownerId;

  ctx.render(detailsTemplate(car, gotUser, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this car?');

    if (choice) {
      await deleteData(id);

      page.redirect('/cars');
    }
  }
}