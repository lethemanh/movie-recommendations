import { LOCAL_STORAGE } from "../constants";

export const addToFavorites = (movie: FavoriteMovieType) => {
  try {
    const storage = localStorage.getItem(LOCAL_STORAGE.favoriteMovies);
    if (storage === null) {
      throw new Error("key is not found");
    }
    const movies: FavoriteMovieType[] = JSON.parse(storage);
    const isAlreadyInLocalStorage = !!movies.find(
      (favMovie) => favMovie.id === movie.id
    );
    if (isAlreadyInLocalStorage) {
      return;
    }
    movies.push(movie);
    localStorage.setItem(LOCAL_STORAGE.favoriteMovies, JSON.stringify(movies));
  } catch (error) {
    localStorage.setItem(LOCAL_STORAGE.favoriteMovies, JSON.stringify([movie]));
  }
};

export const isInFavorites = (id: number): boolean => {
  try {
    const storage = localStorage.getItem(LOCAL_STORAGE.favoriteMovies);
    if (storage === null) {
      throw new Error("favoriteMovies is null");
    }
    const movies: FavoriteMovieType[] = JSON.parse(storage);
    const isFound = movies.find((movie) => movie.id === id);
    return !!isFound;
  } catch (error) {
    return false;
  }
};

export const getFavoriteMovies = ():
  | {
      movies: FavoriteMovieType[];
      error?: never;
    }
  | { movies?: never; error: { message: string } } => {
  try {
    const storage = localStorage.getItem(LOCAL_STORAGE.favoriteMovies);
    if (storage === null) {
      throw new Error("favoriteMovies is null");
    }
    const movies: FavoriteMovieType[] = JSON.parse(storage);
    return { movies };
  } catch (error) {
    return { error: { message: "You haven't bookmarked any movies :(" } };
  }
};

export const removeFromFavorites = (id: number): { acknowledged: boolean } => {
  try {
    const storage = localStorage.getItem(LOCAL_STORAGE.favoriteMovies);
    if (storage === null) {
      throw new Error("favoriteMovies is null");
    }
    const movies: FavoriteMovieType[] = JSON.parse(storage);
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    localStorage.setItem(
      LOCAL_STORAGE.favoriteMovies,
      JSON.stringify(updatedMovies)
    );
    return { acknowledged: true };
  } catch (error) {
    return { acknowledged: false };
  }
};

export type FavoriteMovieType = Pick<IMovie, "id" | "poster_path" | "title">;
