import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getPopularMovies, getUpcomingMovies } from '@API/requests';
import { MoviePoster, LoadingMediaSection, Title } from '~/src/components';

const Home = ({
  popularMoviesInitData,
  upcomingMoviesInitData,
}: {
  popularMoviesInitData: IMovie[];
  upcomingMoviesInitData: IMovie[];
}) => {
  const { data: poplularMovies, isLoading: isLoadingPopularMovie } = useQuery<
    IMovie[]
  >({
    queryKey: ['upcomingMovies'],
    queryFn: () => {
      return getPopularMovies();
    },
    initialData: upcomingMoviesInitData,
  });

  const { data: upcomingMovies, isLoading: isLoadingUpcomingMovie } = useQuery<
    IMovie[]
  >({
    queryKey: ['popularMovies'],
    queryFn: () => {
      return getUpcomingMovies();
    },
    initialData: popularMoviesInitData,
  });

  return (
    <div className="divide-y divide-slate-700">
      <div className="py-5">
        <Title>Popular Movies</Title>
        {isLoadingPopularMovie ? (
          <LoadingMediaSection />
        ) : (
          <div className="grid grid-cols-12 gap-5 p-5">
            {poplularMovies?.map(movie => (
              <MoviePoster movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 py-5">
        <Title>Upcoming Movies</Title>
        {isLoadingUpcomingMovie ? (
          <LoadingMediaSection />
        ) : (
          <div className="grid grid-cols-12 gap-3 p-5">
            {upcomingMovies?.map(movie => (
              <MoviePoster movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<IMovie[]>(['popularMovies', ''], () =>
    getPopularMovies(),
  );

  await queryClient.prefetchQuery<IMovie[]>(['upcomingMovies', ''], () =>
    getUpcomingMovies(),
  );

  return {
    props: {
      popularMoviesInitData: dehydrate(queryClient).queries[0].state
        .data as IMovie[],
      upcomingMoviesInitData: dehydrate(queryClient).queries[0].state
        .data as IMovie[],
    },
  };
};
