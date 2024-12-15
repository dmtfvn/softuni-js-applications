import { html } from '../libs.js';
import { readData } from '../data/crud.js';

const marketplaceTemplate = (drones) => html`
  <h3 class="heading">Marketplace</h3>
  <section id="dashboard">
    ${drones.length ? drones.map(temp) : html`<h3 class="no-drones">No Drones Available</h3>`}
  </section>
`;

const temp = (temp) => html`
  <div class="drone">
    <img src=${temp.imageUrl} alt="example1" />
    <h3 class="model">${temp.model}</h3>
    <div class="drone-info">
      <p class="price">Price: €${temp.price}</p>
      <p class="condition">Condition: ${temp.condition}</p>
      <p class="weight">Weight: ${temp.weight}g</p>
    </div>
    <a class="details-btn" href="/details/${temp._id}">Details</a>
  </div>
`;

export async function showMarketplace(ctx) {
  const drones = await readData();

  ctx.render(marketplaceTemplate(drones));
}