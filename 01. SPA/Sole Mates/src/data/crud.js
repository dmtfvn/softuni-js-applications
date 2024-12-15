import { post, get, put, del } from './reqs.js';

const endpoints = {
  sorted: '/data/shoes?sortBy=_createdOn%20desc',
  items: '/data/shoes',
  item: '/data/shoes/',
  getQuery: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`
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

export async function searchFor(query) {
  return get(endpoints.getQuery(query));
}