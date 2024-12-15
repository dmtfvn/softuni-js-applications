import { createData } from '../data/crud.js';
import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { showErrMsg } from './notification.js';

const createTemplate = (actionCreate) => html`
  <section id="create">
    <div class="form form-item">
      <h2>Share Your item</h2>
      <form class="create-form" @submit=${actionCreate}>
        <input type="text" name="item" id="item" placeholder="Item" />
        <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" />
        <input type="text" name="price" id="price" placeholder="Price in Euro" />
        <input type="text" name="availability" id="availability" placeholder="Availability Information" />
        <input type="text" name="type" id="type" placeholder="Item Type" />
        <textarea id="description" name="description" placeholder="More About The Item" rows="10"
          cols="50"></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`;

async function onCreate(data, form) {
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

  await createData(formData);

  page.redirect('/market');
}

export function showCreate(ctx) {
  ctx.render(createTemplate(submitForm(onCreate)));
}