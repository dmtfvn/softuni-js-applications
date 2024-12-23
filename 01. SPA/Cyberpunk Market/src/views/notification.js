import { html, render } from '../libs.js';

const errMsgTemplate = (message) => html`
  <span class="msg">${message}</span>
`;

export function showErrMsg(message) {
  const errWrapper = document.querySelector('#errorBox');

  render(errMsgTemplate(message), errWrapper);

  setTimeout(() => {
    errWrapper.replaceChildren();
  }, 3000);
}