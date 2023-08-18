import axiosInstance from "~/lib/utils/axoisInstance";

const getMovieVideos = async (movieId: number) => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/videos`);
  return data as IMovieVideos;
};

export default getMovieVideos;
