const url = 'http://localhost:3030/jsonstore/messenger';

const postAreaEl = document.querySelector('#messages');

const authorInput = document.getElementsByTagName('input')[0];
const contentInput = document.getElementsByTagName('input')[1];

const sendBtn = document.querySelector('#submit');
const refreshBtn = document.querySelector('#refresh');

function attachEvents() {
  sendBtn.addEventListener('click', makePost);
  refreshBtn.addEventListener('click', getAllPosts);
}
attachEvents();

async function makePost() {
  if (authorInput.value === '' && contentInput.value === '') {
    return;
  }

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      author: authorInput.value,
      content: contentInput.value
    })
  });

  authorInput.value = '';
  contentInput.value = '';

  refreshBtn.click();
}

async function getAllPosts() {
  const res = await fetch(url);
  const data = await res.json();

  const chatLog = Object.values(data)
    .map(obj => `${obj.author}: ${obj.content}`)
    .join('\n');

  postAreaEl.textContent = chatLog;
}