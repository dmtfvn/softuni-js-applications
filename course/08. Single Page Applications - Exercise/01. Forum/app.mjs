function createEl(tag, content, elClass, attributes, parent, ...children) {
  let el = document.createElement(tag);
  if (content) {
    el.textContent = content;
  }

  if (elClass) {
    el.classList.add(elClass);
  }

  if (attributes) {
    for (const [key, val] of Object.entries(attributes)) {
      el[key] = val;
    }
  }

  if (parent) {
    parent.appendChild(el);
  }

  for (const child of children) {
    if (child) {
      el.appendChild(child);
    }
  }

  return el;
}

loadPosts();

let postId = undefined;

let topicTitleContainer = document.querySelector('.topic-title');
let postTopicForm = document.querySelector('.new-topic-border');
let form = document.querySelector('form');
let cancelBtn = form.querySelector('.cancel');
let postBtn = form.querySelector('.public');
cancelBtn.addEventListener('click', cancel);
postBtn.addEventListener('click', createPost);

let commentForm = document.querySelector('.answer-comment form');
let commentPostBtn = commentForm.querySelector('button');

commentPostBtn.addEventListener('click', createComment);

let postDetailsSection = document.querySelector('.theme-content');
postDetailsSection.style.display = 'none';
let postComment = postDetailsSection.querySelector('.comment');

let postDetailsTitle = document.querySelector('.theme-name h2');

function cancel(event) {
  event.preventDefault();
  form.reset();
}

async function createPost(e) {
  e.preventDefault();

  let date = new Date();
  let dateString = date.toISOString();

  let topicNameInput = document.querySelector('#topicName');
  let usernameInput = document.querySelector('#username');
  let postTextInput = document.querySelector('#postText');

  let topicNameValue = topicNameInput.value;
  let usernameValue = usernameInput.value;
  let postTextValue = postTextInput.value;

  if (topicNameValue.trim() !== '' && usernameValue.trim() !== '' && postTextValue.trim() !== '') {
    let post = {
      title: topicNameValue,
      username: usernameValue,
      content: postTextValue,
      date: dateString
    };

    let settings = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let createPostRequest = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', settings);

    form.reset();
    loadPosts();
  }
}

async function loadPostDetails(id) {
  let postRequest = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
  let post = await postRequest.json();

  topicTitleContainer.style.display = 'none';
  postTopicForm.style.display = 'none';
  postDetailsSection.style.display = 'block';
  [...postComment.children].forEach(c => c.remove());

  let postDetails = createEl('div', undefined, 'header', undefined, undefined,
    createEl('img', undefined, undefined, { src: './static/profile.png', alt: 'avatar' }, undefined),
    createEl('p', undefined, undefined, undefined, undefined,
      createEl('span', post.username, undefined, undefined, undefined),
      document.createTextNode(' posted on '),
      createEl('time', post.date, undefined, undefined, undefined)
    ),
    createEl('p', post.content, 'post-content', undefined, undefined)
  );

  postDetailsTitle.textContent = post.title;
  postId = post._id;

  postComment.appendChild(postDetails);

  let commentsRequest = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
  let commentsObj = await commentsRequest.json();
  let comments = Object.values(commentsObj);

  let curComments = comments.filter(x => x.postId = post._id);

  for (const comment of curComments) {
    let commentEl = createEl('div', undefined, undefined, { id: comment._id }, undefined,
      createEl('div', undefined, 'topic-name-wrapper', undefined, undefined,
        createEl('div', undefined, 'topic-new', undefined, undefined,
          createEl('p', undefined, undefined, undefined, undefined,
            createEl('strong', comment.username, undefined, undefined, undefined),
            document.createTextNode(' commented on'),
            createEl('time', comment.date, undefined, undefined, undefined)
          ),
          createEl('div', undefined, 'post-content', undefined, undefined,
            createEl('p', comment.postText, undefined, undefined, undefined)
          )
        )
      )
    )

    postComment.appendChild(commentEl);
  }
}

async function createComment(e) {
  e.preventDefault();

  let commentTextInput = commentForm.querySelector('textarea');
  let commentUsernameInput = commentForm.querySelector('input');
  let commentText = commentTextInput.value;
  let commentUsername = commentUsernameInput.value;

  let date = new Date();
  let dateString = date.toISOString();

  let comment = {
    username: commentUsername,
    postText: commentText,
    postId: postId,
    date: dateString
  };

  let settings = {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', settings);

  loadPostDetails(postId);
}

async function loadPosts() {
  let postsRequest = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
  let postsObj = await postsRequest.json();

  let posts = Object.values(postsObj);

  for (const post of posts) {
    let topicContainer = document.createElement('div');
    topicContainer.classList.add('topic-container');
    let topicNameWrapper = document.createElement('div');
    topicNameWrapper.classList.add('topic-name-wrapper');
    let topicName = document.createElement('div');
    topicName.classList.add('topic-name');
    let titleAnchor = document.createElement('a');
    titleAnchor.classList.add('normal');
    let titleHeader = document.createElement('h2');
    titleHeader.textContent = post.title;

    let columnsDiv = document.createElement('div');
    columnsDiv.classList.add('columns');
    let columnsPaddingDiv = document.createElement('div');

    let timeParagraph = document.createElement('p');
    timeParagraph.textContent = `Date: `;
    let time = document.createElement('time');
    time.textContent = post.date;

    let nickDiv = document.createElement('div');
    nickDiv.classList.add('nick-name');

    let nickParagraph = document.createElement('p');
    nickParagraph.textContent = 'Username: ';

    let nickSpan = document.createElement('span');
    nickSpan.textContent = post.username;

    topicContainer.appendChild(topicNameWrapper);
    topicNameWrapper.appendChild(topicName);
    topicName.appendChild(titleAnchor);
    titleAnchor.appendChild(titleHeader);

    topicName.appendChild(columnsDiv);
    columnsDiv.appendChild(columnsPaddingDiv);

    columnsPaddingDiv.appendChild(timeParagraph);
    timeParagraph.appendChild(time);
    columnsPaddingDiv.appendChild(nickDiv);

    nickDiv.appendChild(nickParagraph);
    nickParagraph.appendChild(nickSpan);

    topicTitleContainer.appendChild(topicContainer);

    topicContainer.addEventListener('click', () => loadPostDetails(post._id));
  }
}