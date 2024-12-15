import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { createData } from '../data/crud.js';
import { showErrorMsg } from './notification.js';

const sellTemplate = (actionSell) => html`
  <section id="create">
    <div class="form form-item">
      <h2>Add Drone Offer</h2>
      <form class="create-form" @submit=${actionSell}>
        <input type="text" name="model" id="model" placeholder="Drone Model" />
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
        <input type="number" name="price" id="price" placeholder="Price" />
        <input type="number" name="weight" id="weight" placeholder="Weight" />
        <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
        <input type="text" name="condition" id="condition" placeholder="Condition" />
        <textarea name="description" id="description" placeholder="Description"></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`;

async function onSell(data, form) {
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

  await createData(formData);

  page.redirect('/marketplace');
}

export function showSell(ctx) {
  ctx.render(sellTemplate(submitForm(onSell)));
}