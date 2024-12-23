function loadRepos() {
  const reposEl = document.querySelector('#repos');
  const username = document.querySelector('#username').value;

  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then(res => res.json())
    .then(repos => {
      reposEl.innerHTML = '';

      repos.forEach(repo => {
        const listEl = document.createElement('li');

        const anchorEl = document.createElement('a');
        anchorEl.href = repo.html_url;
        anchorEl.textContent = repo.full_name;

        listEl.appendChild(anchorEl);

        reposEl.appendChild(listEl);
      });
    })
    .catch(() => {
      reposEl.innerHTML = '';

      const listEl = document.createElement('li');
      listEl.textContent = 'Not Found';

      reposEl.appendChild(listEl);
    });
}