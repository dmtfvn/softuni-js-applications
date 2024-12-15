import { render } from '../libs.js';

export function renderRoot(root) {
  return function (ctx, next) {
    ctx.render = (template) => render(template, root);

    next();
  }
}