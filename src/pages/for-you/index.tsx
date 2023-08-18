import React, { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  discoverMovies,
  getPreference,
  getRatedMovies,
  getUserDetail,
} from '@API/requests';
import { dehydrate, QueryClient } from 'react-query';
import { MoviePoster, Title } from '~/src/components';
import { useSnackbar } from 'notistack';

interface Props {
  minRating: number;
}

const RatedList = ({ minRating }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [recommendMovies, setRecommendMovies] = useState<IMovie[]>([]);
  const [preference, setPreference] = useState<IPreference>({});

  useEffect(() => {
    const preference = getPreference();
    setPreference(preference);
  }, []);

  const getRecommendMovies = useCallback(async () => {
    try {
      const movies = await discoverMovies({
        'vote_average.gte': minRating,
        with_cast: preference.favoriteCasts?.join('|'),
        with_genres: preference.favoriteGenres?.join('|'),
        with_companies: preference.favoriteCompanies?.join('|'),
      });
      setRecommendMovies(movies?.results);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [minRating, preference, enqueueSnackbar]);

  useEffect(() => {
    getRecommendMovies();
  }, [getRecommendMovies]);

  return (
    <>
      <Title>Recommend For You</Title>
      <div className="grid grid-cols-12 gap-3 p-5">
        {recommendMovies?.map(movie => (
          <MoviePoster movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default RatedList;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const sessionId = JSON.parse(req.cookies['userToken'] as string)?.session_id;
  const userDetail = await getUserDetail(sessionId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<IMovie[]>(['ratedList', ''], () =>
    getRatedMovies(userDetail.id, sessionId),
  );

  const minRating = Math.min(
    ...(dehydrate(queryClient).queries[0].state.data as IMovie[])?.map(
      (movie: IMovie) => movie.rating as number,
    ),
  );

  return {
    props: {
      minRating,
    },
  };
};
