import React from 'react';
import { GetServerSideProps } from 'next';
import { getRatedMovies, getUserDetail } from '@API/requests';
import { dehydrate, QueryClient } from 'react-query';
import { MoviePoster, Title } from '~/src/components';

const RatedList = ({ movies }: { movies: IMovie[] }) => {
  return (
    <>
      <Title>Your Rated Movies</Title>
      <div className="grid grid-cols-12 gap-3 p-5">
        {movies?.map(movie => (
          <MoviePoster movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default RatedList;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const sessionId = JSON.parse(req.cookies['userToken'] as string)?.session_id;
  const userDetail = await getUserDetail(sessionId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<IMovie[]>(['ratedList', ''], () =>
    getRatedMovies(userDetail.id, sessionId),
  );

  return {
    props: {
      movies: dehydrate(queryClient).queries[0].state.data as IMovie[],
    },
  };
};
