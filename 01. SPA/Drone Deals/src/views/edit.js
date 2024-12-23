import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { readDataById, updateData } from '../data/crud.js';
import { showErrorMsg } from './notification.js';

const editTemplate = (drone, actionEdit) => html`
  <section id="edit">
    <div class="form form-item">
      <h2>Edit Offer</h2>
      <form class="edit-form" @submit=${actionEdit}>
        <input type="text" name="model" id="model" placeholder="Drone Model" .value=${drone.model} />
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value=${drone.imageUrl} />
        <input type="number" name="price" id="price" placeholder="Price" .value=${drone.price} />
        <input type="number" name="weight" id="weight" placeholder="Weight" .value=${drone.weight} />
        <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" .value=${drone.phone} />
        <input type="text" name="condition" id="condition" placeholder="Condition" .value=${drone.condition} />
        <textarea name="description" id="description" placeholder="Description">${drone.description}</textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

export async function showEdit(ctx) {
  const id = ctx.params.id;

  const drone = await readDataById(id);

  ctx.render(editTemplate(drone, submitForm(onEdit)));

  async function onEdit(data, form) {
    if (Object.values(data).some(el => el === '')) {
      return showErrorMsg('All fields are required');
    }

    const formData = {
      model: data.model,
      imageUrl: data.imageUrl,
      price: data.price,
      condition: data.condition,
      weight: data.weight,
      phone: data.phone,
      description: data.description
    };

    await updateData(id, formData);

    page.redirect(`/details/${id}`);
  }
}