import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { createData } from '../data/crud.js';

const addTemplate = (actionAdd) => html`
  <section id="create">
    <div class="form">
      <h2>Add item</h2>
      <form class="create-form" @submit=${actionAdd}>
        <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
        <input type="text" name="model" id="shoe-model" placeholder="Model" />
        <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
        <input type="text" name="release" id="shoe-release" placeholder="Release date" />
        <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
        <input type="text" name="value" id="shoe-value" placeholder="Value" />
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

async function onAdd(data, form) {
  if (Object.values(data).some(el => el === '')) {
    return alert('All fields are required');
  }

  const formData = {
    brand: data.brand,
    model: data.model,
    imageUrl: data.imageUrl,
    release: data.release,
    designer: data.designer,
    value: data.value
  };

  await createData(formData);

  page.redirect('/dashboard');
}

export function showAdd(ctx) {
  ctx.render(addTemplate(submitForm(onAdd)));
}