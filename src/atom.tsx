import { atom } from "recoil";
import { IMovie } from "./api";

export const allMoviesState = atom<IMovie[]>({
  default: [],
  key: "allMovies",
});
