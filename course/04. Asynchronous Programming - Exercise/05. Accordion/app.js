async function solution() {
  const mainEl = document.querySelector('#main');

  const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
  const res = await fetch(url);

  const data = await res.json();

  data.forEach(obj => {
    const divAccordion = createNewEl('div', 'accordion');

    const divHead = createNewEl('div', 'head');

    const spanEl = createNewEl('span', '', '', obj.title);
    const btnEl = createNewEl('button', 'button', obj._id, 'More');

    const divExtra = createNewEl('div', 'extra');
    const para = createNewEl('p');

    divExtra.appendChild(para);

    divHead.appendChild(spanEl);
    divHead.appendChild(btnEl);

    divAccordion.appendChild(divHead);
    divAccordion.appendChild(divExtra);

    mainEl.appendChild(divAccordion);

    btnEl.addEventListener('click', toggle);
  });

  async function toggle(e) {
    const accordion = e.target.closest('.accordion');

    const extra = accordion.querySelector('.extra');
    const p = accordion.querySelector('.extra p');

    const id = e.target.id;

    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    const res = await fetch(url);

    const data = await res.json();

    p.textContent = data.content;

    const viewToggle = e.target.textContent === 'More';

    extra.style.display = viewToggle ? 'block' : 'none';
    e.target.textContent = viewToggle ? 'Less' : 'More';
  }

  function createNewEl(tagName, _class, _id, content) {
    const newEl = document.createElement(tagName);
    newEl.className = _class;
    newEl.id = _id;
    newEl.textContent = content;

    return newEl;
  }
}

window.addEventListener('load', solution);