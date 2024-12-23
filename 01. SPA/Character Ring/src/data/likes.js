import { post, get } from './reqs.js';

const endpoints = {
  charLike: '/data/useful',
  getLikesTotalCount: (characterId) => `/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`,
  getLikerPerUser: (characterId, userId) => `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function addLike(characterId) {
  return post(endpoints.charLike, { characterId });
}

export async function showLikesTotalCount(characterId) {
  return get(endpoints.getLikesTotalCount(characterId));
}

export async function showLikerPerUser(characterId, userId) {
  return get(endpoints.getLikerPerUser(characterId, userId));
}