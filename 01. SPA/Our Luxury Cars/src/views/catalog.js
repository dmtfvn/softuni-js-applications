import { html } from '../libs.js';
import { readData } from '../data/crud.js';

const carsTemplate = (cars) => html`
  <h3 class="heading">Our Cars</h3>
  <section id="dashboard">
    ${cars.length ? cars.map(tempalte) : html`<h3 class="nothing">Nothing to see yet</h3>`}
  </section>
`;

const tempalte = (temp) => html`
  <div class="car">
    <img src=${temp.imageUrl} alt="example1" />
    <h3 class="model">${temp.model}</h3>
    <div class="specs">
      <p class="price">Price: €${temp.price}</p>
      <p class="weight">Weight: ${temp.weight} kg</p>
      <p class="top-speed">Top Speed: ${temp.speed} kph</p>
    </div>
    <a class="details-btn" href="/details/${temp._id}">More Info</a>
  </div>
`;

export async function showCars(ctx) {
  const cars = await readData();

  ctx.render(carsTemplate(cars));
}