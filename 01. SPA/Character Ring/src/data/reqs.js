import { getUserData, clearUserData } from '../utils.js';

const host = 'http://localhost:3030';

async function request(method, url, data) {
  const options = {
    method,
    headers: {}
  };

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();

  if (userData) {
    options.headers['X-Authorization'] = userData.accessToken;
  }

  try {
    const res = await fetch(host + url, options);

    if (!res.ok) {
      if (res.status === 403) {
        clearUserData();
      }

      const err = await res.json();
      throw new Error(err.message);
    }

    if (res.status !== 204) {
      const data = await res.json();

      return data;
    }
  } catch (err) {
    alert(err.message);

    throw err;
  }
}

export const post = (url, data) => request('POST', url, data);
export const get = (url) => request('GET', url);
export const put = (url, data) => request('PUT', url, data);
export const del = (url) => request('DELETE', url);