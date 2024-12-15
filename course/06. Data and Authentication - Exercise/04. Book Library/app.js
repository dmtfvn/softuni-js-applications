const url = 'http://localhost:3030/jsonstore/collections/books';

const booksList = document.querySelector('body table tbody');

const titleInput = document.getElementsByTagName('input')[0];
const authorInput = document.getElementsByTagName('input')[1];

const loadBooksBtn = document.querySelector('#loadBooks');
loadBooksBtn.addEventListener('click', getAllBooks);

const submitBtn = document.querySelector('body form button');
submitBtn.addEventListener('click', submitNewBook);

const formEl = document.querySelector('body form');

async function getAllBooks() {
  const res = await fetch(url);
  const data = await res.json();

  booksList.replaceChildren();

  Object.entries(data).forEach(b => {
    const tr = document.createElement('tr');

    const title = tr.insertCell(0);
    title.textContent = b[1].title;

    const author = tr.insertCell(1);
    author.textContent = b[1].author;

    const btnContainer = tr.insertCell(2);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.id = b[0];
    editBtn.addEventListener('click', editBook);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.id = b[0];
    deleteBtn.addEventListener('click', deleteBook)

    btnContainer.append(editBtn, deleteBtn);

    booksList.appendChild(tr);
  });
}

async function submitNewBook(e) {
  e.preventDefault();

  if (titleInput.value === '' || authorInput.value === '') {
    return;
  }

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      author: authorInput.value,
      title: titleInput.value
    })
  })

  titleInput.value = '';
  authorInput.value = '';
}

async function editBook(e) {
  const formTitle = document.querySelector('body form h3');
  formTitle.textContent = 'Edit FORM';

  submitBtn.remove();

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.id = e.target.id;
  saveBtn.addEventListener('click', async () => {
    const id = saveBtn.id;

    await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: authorInput.value,
        title: titleInput.value
      })
    });
  });

  formEl.appendChild(saveBtn);

  const parentEl = e.target.closest('tr');

  const title = parentEl.querySelectorAll('td')[0].textContent;
  const author = parentEl.querySelectorAll('td')[1].textContent;

  titleInput.value = title;
  authorInput.value = author;
}

async function deleteBook(e) {
  const parentEl = e.target.closest('tr');
  const id = e.target.id;

  await fetch(`${url}/${id}`, {
    method: 'DELETE'
  })

  parentEl.remove();
}