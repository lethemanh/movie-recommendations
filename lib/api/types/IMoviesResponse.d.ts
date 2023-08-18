interface IMovie {
  genres: string[];
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_data: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  rating?: number;
}
interface IMoviesResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}
