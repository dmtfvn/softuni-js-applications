import { get, post } from "./reqs.js";

const endpoints = {
  likeMovie: '/data/likes',
  getLikesCountPerMovie: (movieId) => `/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`,
  getLikesFromUser: (movieId, userId) => `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function addLike(movieId) {
  await post(endpoints.likeMovie, { movieId });
}

export async function showLikesCountPerMovie(movieId) {
  return get(endpoints.getLikesCountPerMovie(movieId));
}

export async function showLikesFromUser(movieId, userId) {
  return get(endpoints.getLikesFromUser(movieId, userId));
}