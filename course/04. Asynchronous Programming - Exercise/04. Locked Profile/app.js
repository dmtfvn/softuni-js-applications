function lockedProfile() {
  const mainEl = document.querySelector('#main');

  const url = 'http://localhost:3030/jsonstore/advanced/profiles';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let count = 0;

      for (const obj of Object.values(data)) {
        count++;

        const div = document.createElement('div');
        div.className = 'profile';
        div.innerHTML = `
          <img src="./iconProfile2.png" class="userIcon" />
          <label>Lock</label>
          <input type="radio" name="user${count}Locked" value="lock" checked>
          <label>Unlock</label>
          <input type="radio" name="user${count}Locked" value="unlock"><br>
          <hr>
          <label>Username</label>
          <input type="text" name="user${count}Username" value="${obj.username}" disabled readonly />
          <div class="user${count}Username" hidden>
            <hr>
            <label>Email:</label>
            <input type="email" name="user${count}Email" value="${obj.email}" disabled readonly />
            <label>Age:</label>
            <input type="number" name="user${count}Age" value="${obj.age}" disabled readonly />
          </div>
          <button>Show more</button>
        `;

        mainEl.appendChild(div);
      }

      mainEl.addEventListener('click', (e) => {
        if (e.target.nodeName === 'BUTTON') {
          const curUser = e.target.closest('.profile');

          const state = curUser.querySelector('input[type="radio"]:checked').value;

          if (state === 'unlock') {
            const hiddenFieldsEl = curUser.querySelector('[class*="Username"]');

            if (hiddenFieldsEl.hidden === true) {
              hiddenFieldsEl.hidden = false;
              e.target.textContent = 'Hide it';
            } else {
              hiddenFieldsEl.hidden = true;
              e.target.textContent = 'Show more';
            }
          }
        }
      });
    });
}