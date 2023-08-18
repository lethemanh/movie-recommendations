import Cookies from "js-cookie";
import axiosInstance from "~/lib/utils/axoisInstance";

const getPopularMovies = async (page = 1) => {
  const { data } = await axiosInstance.get<IMoviesResponse>(
    "/movie/popular",
    {
      params: { page },
    }
  );
  return data?.results?.slice(0, 12) as IMovie[];
};

const getUpcomingMovies = async (page = 1) => {
  const { data } = await axiosInstance.get<IMoviesResponse>(
    "/movie/upcoming",
    {
      params: { page },
    }
  );
  return data?.results?.slice(0, 12) as IMovie[];
};

const discoverMovies = async (payload: any) => {
  const { data } = await axiosInstance.get<IMoviesResponse>(
    "/discover/movie",
    {
      params: payload,
    }
  );
  return data as IMoviesResponse;
}

const searchMovieByName = async (query: string, genre?: number) => {
  const { data } = await axiosInstance.get("/search/movie", {
    params: { query },
  });

  return {
    ...data,
    results: genre ? data.results.filter((movie: IMovie) => movie.genre_ids.includes(genre)) : data.results,
  } as IMoviesResponse;
};

const getRatedMovies = async (accountId: number, sessionId: string) => {
  const { data } = await axiosInstance.get(`/account/${accountId}/rated/movies`, {
    params: { session_id: sessionId },
  });

  return data.results as IMovie[];
}

export { getPopularMovies, getUpcomingMovies, discoverMovies, searchMovieByName, getRatedMovies };
