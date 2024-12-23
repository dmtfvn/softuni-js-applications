const url = 'http://localhost:3030/data/catches';

let userData = null;

window.addEventListener('DOMContentLoaded', () => {
  userData = JSON.parse(localStorage.getItem('userData'));

  if (userData !== null) {
    const guestNav = document.querySelector('#guest');
    guestNav.style.display = 'none';

    const userEmail = document.querySelector('.email span');
    userEmail.textContent = userData.email;

    const addBtn = document.querySelector('.add');
    addBtn.disabled = false;
  } else {
    const userNav = document.querySelector('#user');
    userNav.style.display = 'none';
  }
});

const catchesEl = document.querySelector('#catches');

const loadBtn = document.querySelector('.load');
loadBtn.addEventListener('click', loadAllCatches);

async function loadAllCatches() {
  const res = await fetch(`${url}`);
  const data = await res.json();

  catchesEl.replaceChildren();

  data.forEach(obj => {
    const divCatch = document.createElement('div');
    divCatch.className = 'catch';

    divCatch.appendChild(createLable('Angler'));
    divCatch.appendChild(createInput('text', 'angler', `${obj.angler}`));
    divCatch.appendChild(createLable('Weight'));
    divCatch.appendChild(createInput('text', 'weight', `${obj.weight}`));
    divCatch.appendChild(createLable('Species'));
    divCatch.appendChild(createInput('text', 'species', `${obj.species}`));
    divCatch.appendChild(createLable('Location'));
    divCatch.appendChild(createInput('text', 'location', `${obj.location}`));
    divCatch.appendChild(createLable('Bait'));
    divCatch.appendChild(createInput('text', 'bait', `${obj.bait}`));
    divCatch.appendChild(createLable('Capture'));
    divCatch.appendChild(createInput('number', 'captureTime', `${obj.captureTime}`));

    const updateBtn = document.createElement('button');
    updateBtn.className = 'update';
    updateBtn.textContent = 'Update';
    updateBtn.setAttribute('data-id', obj._id);
    updateBtn.disabled = true;
    updateBtn.addEventListener('click', updateCatch);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('data-id', obj._id);
    deleteBtn.disabled = true;
    deleteBtn.addEventListener('click', deleteCatch);

    divCatch.appendChild(updateBtn);
    divCatch.appendChild(deleteBtn);

    catchesEl.appendChild(divCatch);

    if (userData && userData.id === obj._ownerId) {
      updateBtn.disabled = false;
      deleteBtn.disabled = false;

      const inputs = divCatch.querySelectorAll('input');
      inputs.forEach(i => i.disabled = false);
    }
  });
}

const addForm = document.querySelector('#addForm');
addForm.addEventListener('submit', createNewCatch);

async function createNewCatch(e) {
  e.preventDefault();

  const obj = Object.fromEntries(new FormData(e.currentTarget));

  try {
    if (Object.values(obj).some(v => v === '')) {
      throw new Error('All fields must be filled');
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.token
      },
      body: JSON.stringify({
        angler: obj.angler,
        weight: obj.weight,
        species: obj.species,
        location: obj.location,
        bait: obj.bait,
        captureTime: obj.captureTime
      })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    loadAllCatches();
    e.target.reset();
  } catch (err) {
    alert(err.message);
  }
}

function createLable(content) {
  const label = document.createElement('label');
  label.textContent = content;

  return label;
}

function createInput(eType, eClass, eValue) {
  const input = document.createElement('input');
  input.type = eType;
  input.className = eClass;
  input.setAttribute('value', eValue);
  input.disabled = true;

  return input;
}

async function deleteCatch(e) {
  const parentEl = e.target.closest('.catch');
  const id = e.target.dataset.id;

  await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'X-Authorization': userData.token
    }
  })

  parentEl.remove();
}

async function updateCatch(e) {
  const parentEl = e.target.closest('.catch');
  const id = e.target.dataset.id;

  const inputValues = [];

  const inputs = parentEl.querySelectorAll('input');
  inputs.forEach(i => {
    inputValues.push(i.value);
  });

  const res = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userData.token
    },
    body: JSON.stringify({
      angler: inputValues[0],
      weight: inputValues[1],
      species: inputValues[2],
      location: inputValues[3],
      bait: inputValues[4],
      captureTime: inputValues[5]
    })
  });
}

const logout = document.querySelector('#logout');
logout.addEventListener('click', async () => {
  await fetch('http://localhost:3030/users/logout', {
    headers: {
      'X-Authorization': userData.token
    }
  });

  localStorage.clear();

  window.location = 'index.html';
});