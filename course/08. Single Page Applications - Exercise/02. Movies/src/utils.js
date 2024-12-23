export function setUserData(data) {
  localStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData() {
  return JSON.parse(localStorage.getItem('userData'));
}

export function clearUserData() {
  localStorage.removeItem('userData');
}

export function submitHandler(callback) {
  return function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

    callback(Object.fromEntries(data), e.target);
  }
}

export function addMovie() {
  const userData = getUserData();

  document.querySelectorAll('.user')[2].style.display = userData ? 'inline' : 'none';
}