import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { readDataById, updateData } from '../data/crud.js';

const editTemplate = (char, actionEdit) => html`
  <section id="edit">
    <div class="form">
      <img class="border" src="./images/border.png" alt="">
      <h2>Edit Character</h2>
      <form class="edit-form" @submit=${actionEdit}>
        <input type="text" name="category" id="category" placeholder="Character Type" .value=${char.category} />
        <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${char.imageUrl} />
        <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${char.description}</textarea>
        <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"
          cols="10">${char.moreInfo}</textarea>
        <button type="submit">Edit</button>
      </form>
      <img class="border" src="./images/border.png" alt="">
    </div>
  </section>
`;

export async function showEdit(ctx) {
  const id = ctx.params.id;

  const character = await readDataById(id);

  ctx.render(editTemplate(character, submitForm(onEdit)));

  async function onEdit(data, form) {
    if (Object.values(data).some(el => el === '')) {
      return alert('All fields are required');
    }

    const formData = {
      category: data['category'],
      imageUrl: data['image-url'],
      description: data['description'],
      moreInfo: data['additional-info']
    };

    await updateData(id, formData);

    page.redirect(`/details/${id}`);
  }
}