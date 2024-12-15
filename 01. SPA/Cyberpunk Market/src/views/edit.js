import { html, page } from '../libs.js';
import { readDataById, updateData } from '../data/crud.js';
import { submitForm } from '../utils.js';
import { showErrMsg } from './notification.js';

const editTemplate = (item, actionEdit) => html`
  <section id="edit">
    <div class="form form-item">
      <h2>Edit Your Item</h2>
      <form class="edit-form" @submit=${actionEdit}>
        <input type="text" name="item" id="item" placeholder="Item" .value="${item.item}" />
        <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" .value="${item.imageUrl}" />
        <input type="text" name="price" id="price" placeholder="Price in Euro" .value="${item.price}" />
        <input type="text" name="availability" id="availability" placeholder="Availability Information" .value="${item.availability}" />
        <input type="text" name="type" id="type" placeholder="Item Type" .value="${item.type}" />
        <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50">
          ${item.description}
        </textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

export async function showEdit(ctx) {
  const id = ctx.params.id;

  const item = await readDataById(id);

  ctx.render(editTemplate(item, submitForm(onEdit)));

  async function onEdit(data, from) {
    if (Object.values(data).some(el => el === '')) {
      return showErrMsg('All fields are required');
    }

    const formData = {
      item: data.item,
      imageUrl: data.imageUrl,
      price: data.price,
      availability: data.availability,
      type: data.type,
      description: data.description
    };

    await updateData(id, formData);

    page.redirect(`/details/${id}`);
  }
}