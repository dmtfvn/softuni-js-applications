import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { readDataById, updateData } from '../data/crud.js';

const editTemplate = (car, actionEdit) => html`
  <section id="edit">
    <div class="form form-auto">
      <h2>Edit Your Car</h2>
      <form class="edit-form" @submit=${actionEdit}>
        <input type="text" name="model" id="model" placeholder="Model" .value=${car.model} />
        <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" .value=${car.imageUrl} />
        <input type="text" name="price" id="price" placeholder="Price in Euro" .value=${car.price} />
        <input type="number" name="weight" id="weight" placeholder="Weight in Kg" .value=${car.weight} />
        <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" .value=${car.speed} />
        <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50">${car.about}</textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

export async function showEdit(ctx) {
  const id = ctx.params.id;

  const car = await readDataById(id);

  ctx.render(editTemplate(car, submitForm(onEdit)));

  async function onEdit(data, form) {
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

    await updateData(id, formData);

    page.redirect(`/details/${id}`);
  }
}