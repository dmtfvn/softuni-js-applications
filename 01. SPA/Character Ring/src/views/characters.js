import { html } from '../libs.js';
import { readData } from '../data/crud.js';

const charactersTemplate = (characters) => html`
  <h2>Characters</h2>
  <section id="characters">
    ${characters.length ? characters.map(heroTemplate) : html`<h2>No added Heroes yet.</h2>`}
  </section>  
`;

const heroTemplate = (char) => html`
  <div class="character">
    <img src=${char.imageUrl} alt="example1" />
    <div class="hero-info">
      <h3 class="category">${char.category}</h3>
      <p class="description">${char.description}</p>
      <a class="details-btn" href="/details/${char._id}">More Info</a>
    </div>
  </div>
`;

export async function showCharacters(ctx) {
  const characters = await readData();

  ctx.render(charactersTemplate(characters));
}