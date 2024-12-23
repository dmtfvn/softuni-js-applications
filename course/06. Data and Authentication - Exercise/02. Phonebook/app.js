const url = 'http://localhost:3030/jsonstore/phonebook';

const phonebookEl = document.querySelector('#phonebook');

const loadBtn = document.querySelector('#btnLoad');
const createBtn = document.querySelector('#btnCreate');

const personInput = document.querySelector('#person');
const phoneInput = document.querySelector('#phone');

function attachEvents() {
  loadBtn.addEventListener('click', loadAllContacts);
  createBtn.addEventListener('click', createNewContact);
}
attachEvents();

async function loadAllContacts() {
  const res = await fetch(url);
  const data = await res.json();

  phonebookEl.replaceChildren();

  const contactsList = Object.values(data);
  contactsList.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.person}: ${c.phone}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.id = c._id;
    deleteBtn.addEventListener('click', deleteItem);

    li.appendChild(deleteBtn);
    phonebookEl.append(li);
  });
}

async function createNewContact() {
  if (personInput.value === '' && phoneInput.value === '') {
    return;
  }

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      person: personInput.value,
      phone: phoneInput.value
    })
  });

  personInput.value = '';
  phoneInput.value = '';

  loadBtn.click();
}

async function deleteItem(e) {
  const parentEl = e.target.closest('li');
  const id = e.target.id;

  await fetch(`${url}/${id}`, {
    method: 'DELETE'
  })

  parentEl.remove();
}