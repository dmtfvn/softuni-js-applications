const url = 'http://localhost:3030/users';

const loginForm = document.querySelector('#login-view form');
loginForm.addEventListener('submit', loginUser);

async function loginUser(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const credentials = Object.fromEntries(formData);

  const { email, password } = credentials;

  try {
    const res = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (data.code >= 400) {
      throw new Error('Invalid Email or Password');
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