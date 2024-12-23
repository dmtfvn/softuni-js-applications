import { post, get, put, del } from './reqs.js';

const endpoints = {
  sorted: '/data/characters?sortBy=_createdOn%20desc',
  items: '/data/characters',
  item: '/data/characters/'
};

export async function createData(data) {
  return post(endpoints.items, data);
}

export async function readData() {
  return get(endpoints.sorted);
}

export async function readDataById(id) {
  return get(endpoints.item + id);
}

export async function updateData(id, data) {
  return put(endpoints.item + id, data);
}

export async function deleteData(id) {
  return del(endpoints.item + id);
}