import { html, render as renderRoot } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs'

const root = document.querySelector('main');

function render(template) {
  renderRoot(template, root);
}

export {
  html,
  render,
  page
}