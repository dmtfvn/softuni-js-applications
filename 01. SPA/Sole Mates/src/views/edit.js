import { readDataById, updateData } from '../data/crud.js';
import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';

const editTemplate = (pair, actionEdit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit item</h2>
      <form class="edit-form" @submit=${actionEdit}>
        <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${pair.brand} />
        <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${pair.model} />
        <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${pair.imageUrl} />
        <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${pair.release} />
        <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${pair.designer} />
        <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${pair.value} />
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function showEdit(ctx) {
  const id = ctx.params.id;

  const pair = await readDataById(id);

  ctx.render(editTemplate(pair, submitForm(onEdit)));

  async function onEdit(data, form) {
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

    await updateData(id, formData);

    page.redirect(`/details/${id}`);
  }
}