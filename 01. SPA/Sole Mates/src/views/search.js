import { html } from '../libs.js';
import { submitForm } from '../utils.js';
import { searchFor } from '../data/crud.js';

const searchTemplate = (actionSearch, result = [], userData) => {
  const btn = (id) => html`
    <a class="details-btn" href="/details/${id}">Details</a>
  `;

  return html`
    <section id="search">
      <h2>Search by Brand</h2>

      <form class="search-wrapper cf" @submit=${actionSearch}>
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
      </form>

      <h3>Results:</h3>

      <div id="search-container">
        <ul class="card-wrapper">
          ${result.length ? html`
            ${userData ? result.map(p => temp(p, btn(p._id))) : result.map(p => temp(p, ''))}
            ` : html`
            <h2>There are no results found.</h2>
            `}
        </ul>
      </div>
    </section>
  `;
}

const temp = (pair, btn) => html`
  <li class="card">
    <img src=${pair.imageUrl} alt="travis" />
    <p>
      <strong>Brand: </strong><span class="brand">${pair.brand}</span>
    </p>
    <p>
      <strong>Model: </strong><span class="model">${pair.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${pair.value}</span>$</p>
    ${btn}
  </li>
`;

export function showSearch(ctx) {
  const userData = ctx.userData;

  ctx.render(searchTemplate(submitForm(onSearch)));

  async function onSearch(data, form) {
    if (Object.values(data).some(el => el === '')) {
      return alert('All fields are required');
    }

    const query = data.search;

    const result = await searchFor(query);

    ctx.render(searchTemplate(submitForm(onSearch), result, userData));
  }
}