import { html, render } from '../libs.js';

const errorMsgTempalte = (message) => html`
  <span class="msg">${message}</span>
`;

export function showErrorMsg(message) {
  const msgWrapper = document.querySelector('#errorBox');

  render(errorMsgTempalte(message), msgWrapper);

  setTimeout(() => {
    msgWrapper.replaceChildren();
  }, 3000);
}