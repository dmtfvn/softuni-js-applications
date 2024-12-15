import { html, page } from '../libs.js';
import { submitForm } from '../utils.js';
import { createData } from '../data/crud.js';

const addTemplate = (actionCreate) => html`
  <section id="create">
    <div class="form">
      <img class="border" src="./images/border.png" alt="">
      <h2>Add Character</h2>
      <form class="create-form" @submit=${actionCreate}>
        <input type="text" name="category" id="category" placeholder="Character Type" />
        <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
        <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
        <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"
          cols="10"></textarea>
        <button type="submit">Add Character</button>
      </form>
      <img class="border" src="./images/border.png" alt="">
    </div>
  </section>
`;

async function onCreate(data, form) {
  if (Object.values(data).some(el => el === '')) {
    return alert('All fields are required');
  }

  const formData = {
    category: data['category'],
    imageUrl: data['image-url'],
    description: data['description'],
    moreInfo: data['additional-info']
  };

  await createData(formData);

  page.redirect('/characters');
}

export function showAdd(ctx) {
  ctx.render(addTemplate(submitForm(onCreate)));
}