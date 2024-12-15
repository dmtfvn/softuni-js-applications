function attachEvents() {
  const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
  const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

  const loadPostsBtn = document.querySelector('#btnLoadPosts');
  const viewPostBtn = document.querySelector('#btnViewPost');

  const postsEl = document.querySelector('#posts');
  const postCommentsEl = document.querySelector('#post-comments');

  const postTitleEl = document.querySelector('#post-title');
  const postBodyEl = document.querySelector('#post-body');

  let commonData;

  loadPostsBtn.addEventListener('click', () => {
    fetch(postsUrl)
      .then(res => res.json())
      .then(data => {
        commonData = data;

        postsEl.innerHTML = '';

        for (const [id, postInfo] of Object.entries(data)) {
          const option = document.createElement('option');
          option.value = id;
          option.textContent = postInfo.title;

          postsEl.appendChild(option);
        }
      });
  });

  viewPostBtn.addEventListener('click', () => {
    const selectedPostId = postsEl.value;
    postTitleEl.textContent = commonData[selectedPostId].title;
    postBodyEl.textContent = commonData[selectedPostId].body;

    fetch(commentsUrl)
      .then(res => res.json())
      .then(data => {
        postCommentsEl.innerHTML = '';

        for (const [id, commentInfo] of Object.entries(data)) {
          const li = document.createElement('li');
          li.id = id;
          li.textContent = commentInfo.text;

          postCommentsEl.appendChild(li);
        }
      });
  });
}

attachEvents();