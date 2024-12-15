function loadCommits() {
  const username = document.querySelector('#username').value;
  const repo = document.querySelector('#repo').value;

  const commitsList = document.querySelector('#commits');

  const url = `https://api.github.com/repos/${username}/${repo}/commits`;

  fetch(url)
    .then(res => {
      if (res.status >= 400) {
        throw new Error(`Error: ${res.status} (Not Found)`);
      }

      return res.json();
    })
    .then(data => {
      commitsList.innerHTML = '';

      data.forEach(c => {
        const listEl = document.createElement('li');
        listEl.textContent = `${c.commit.author.name}: ${c.commit.message}`;

        commitsList.appendChild(listEl);
      });
    })
    .catch(err => {
      commitsList.innerHTML = '';

      const listEl = document.createElement('li');
      listEl.textContent = err.message;

      commitsList.appendChild(listEl);
    });
}