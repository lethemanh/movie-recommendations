import axiosInstance from "~/lib/utils/axoisInstance";

const rateMovie = async ({
  movieId,
  rate,
  sessionId,
}: {
  movieId: string;
  rate: number;
  sessionId: string
}) => {
  const { data } = await axiosInstance.post(
    `/movie/${movieId}/rating`,
    {
      value: rate,
    },
    { params: { session_id: sessionId } }
  );
  return data;
};

export default rateMovie;
