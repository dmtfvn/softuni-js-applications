const url = 'http://localhost:3030/users';

const regForm = document.querySelector('#register-view form');
regForm.addEventListener('submit', regUser);

async function regUser(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  try {
    if (formData.get('password') !== formData.get('rePass')) {
      throw new Error('No match between passwords');
    }

    const res = await fetch(`${url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        rePass: formData.get('rePass')
      })
    });

    const data = await res.json();

    if (data.code >= 400) {
      throw new Error('All fields must be filled');
    }

    const userData = {
      email: data.email,
      id: data._id,
      token: data.accessToken
    }
    localStorage.setItem('userData', JSON.stringify(userData));

    window.location = 'index.html';
  } catch (err) {
    alert(err.message);
  }
}