import { get, post, put, del } from "./reqs.js";

const endpoints = {
  movies: '/data/movies',
  movieId: '/data/movies/'
};

export async function getAllMovies() {
  return get(endpoints.movies);
}

export async function getMovieById(id) {
  return get(endpoints.movieId + id);
}

export async function createMovie(title, description, img) {
  return post(endpoints.movies, {
    title,
    description,
    img
  });
}

export async function updateMovie(id, data) {
  return put(endpoints.movieId + id, data);
}

export async function deleteMovie(id) {
  return del(endpoints.movieId + id);
}