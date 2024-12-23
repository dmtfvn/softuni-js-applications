import { post, get, put, del } from './reqs.js';

const endpoints = {
  sorted: '/data/cars?sortBy=_createdOn%20desc',
  items: '/data/cars',
  item: '/data/cars/',
  getQuery: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`
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