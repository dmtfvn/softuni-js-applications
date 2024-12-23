export function setUserData(data) {
  const userData = {
    accessToken: data.accessToken,
    email: data.email,
    _id: data._id
  };

  localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData() {
  return JSON.parse(localStorage.getItem('userData'));
}

export function clearUserData() {
  localStorage.removeItem('userData');
}

export function submitForm(callback) {
  return function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

    callback(Object.fromEntries(data), e.target);
  }
}