import { html } from '../libs.js';

const homeTemplate = () => html`
  <section id="hero">
    <h1>
      Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
    </h1>
  </section>
`;

export function showHome(ctx) {
  ctx.render(homeTemplate());
}