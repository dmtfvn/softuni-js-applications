import { html } from '../libs.js';
import { submitForm } from '../utils.js';
import { searchFor } from '../data/crud.js';

const searchTemplate = (actionSearch, result = []) => html`
  <section id="search">
    <div class="form">
      <h4>Search</h4>
      <form class="search-form" @submit=${actionSearch}>
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
      </form>
    </div>
    <div class="search-result">
      ${result.length ? result.map(resultTemplate) : html`<h2 class="no-avaliable">No result.</h2>`}
    </div>
  </section>
`;

const resultTemplate = (car) => html`
  <div class="car">
    <img src=${car.imageUrl} alt="example1" />
    <h3 class="model">${car.model}</h3>
    <a class="details-btn" href="/details/${car._id}">More Info</a>
  </div>
`;

export function showSearch(ctx) {
  ctx.render(searchTemplate(submitForm(onSearch)));

  async function onSearch(data, form) {
    if (Object.values(data).some(el => el === '')) {
      return alert('Search field is empty');
    }

    const query = data.search;

    const result = await searchFor(query);

    ctx.render(searchTemplate(submitForm(onSearch), result));
  }
}