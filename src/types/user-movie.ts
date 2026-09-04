import type { Movie } from "./movie";

export type UserMovie = Movie & {is_watched: boolean};
