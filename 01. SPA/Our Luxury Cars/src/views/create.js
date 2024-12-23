import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { createData } from '../data/crud.js';

const addTemplate = (actionCreate) => html`
  <section id="create">
    <div class="form form-auto">
      <h2>Share Your Car</h2>
      <form class="create-form" @submit=${actionCreate}>
        <input type="text" name="model" id="model" placeholder="Model" />
        <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" />
        <input type="text" name="price" id="price" placeholder="Price in Euro" />
        <input type="number" name="weight" id="weight" placeholder="Weight in Kg" />
        <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" />
        <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50"></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`;

async function onCreate(data, form) {
  if (Object.values(data).some(el => el === '')) {
    return alert('All fields are required');
  }

  const formData = {
    model: data.model,
    imageUrl: data.imageUrl,
    price: data.price,
    weight: data.weight,
    speed: data.speed,
    about: data.about
  };

  await createData(formData);

  page.redirect('/cars');
}

export function showAdd(ctx) {
  ctx.render(addTemplate(submitForm(onCreate)));
}