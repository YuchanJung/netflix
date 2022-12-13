import { atom } from "recoil";
import { IMovie } from "./api";

export const allMoviesState = atom<IMovie[]>({
  default: [],
  key: "allMovies",
});

export const offsetState = atom<number>({
  default: 6,
  key: "offset",
});
