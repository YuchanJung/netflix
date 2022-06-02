const API_KEY = "800d88957dfd217f6c143b6757ed5639";
const BASE_PATH = "https://api.themoviedb.org/3/";

export const NEFLIX_LOGO_URL =
  "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getNowPlayingMovies() {
  return fetch(`${BASE_PATH}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr
  `).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`)
}