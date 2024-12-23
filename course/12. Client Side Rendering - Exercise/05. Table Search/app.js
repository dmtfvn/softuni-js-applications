import { render, html } from '../node_modules/lit-html/lit-html.js';

solve();

function solve() {
  document.querySelector('#searchBtn').addEventListener('click', onClick);

  const url = 'http://localhost:3030/jsonstore/advanced/table';
  const root = document.querySelector('table tbody');
  const inputRef = document.getElementById('searchField');

  getData();

  async function getData() {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        const err = res.json();
        throw new Error(err.message);
      }

      const data = await res.json();
      const items = Object.values(data);
      const createRows = (items) => html`
        ${items.map((el) => html`
            <tr>
              <td>${el.firstName} ${el.lastName}</td>
              <td>${el.email}</td>
              <td>${el.course}</td>
            </tr>
          `)}
      `;

      render(createRows(items), root);
    } catch (err) {
      alert(err.message);
    }
  }

  function onClick() {
    const text = inputRef.value.toLowerCase();

    if (!text) {
      return;
    }

    const rows = Array.from(root.children);

    for (const row of rows) {
      for (const data of row.children) {
        const dataText = data.textContent.toLowerCase();

        if (dataText.includes(text)) {
          row.classList.add('select');

          break;
        } else {
          row.classList.remove('select');
        }
      }
    }

    inputRef.value = '';
  }
}