import { html } from '../libs.js';
import { readData } from '../data/crud.js';

const dashboardTemplate = (shoes) => html`
  <section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
      ${shoes.length ? shoes.map(template) : html`<h2>There are no items added yet.</h2>`}
    </ul>
  </section>
`;

const template = (pair) => html`
  <li class="card">
    <img src=${pair.imageUrl} alt="travis" />
    <p>
      <strong>Brand: </strong><span class="brand">${pair.brand}</span>
    </p>
    <p>
      <strong>Model: </strong><span class="model">${pair.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${pair.value}</span>$</p>
    <a class="details-btn" href="/details/${pair._id}">Details</a>
  </li>
`;

export async function showDashboard(ctx) {
  const shoes = await readData();

  ctx.render(dashboardTemplate(shoes));
}