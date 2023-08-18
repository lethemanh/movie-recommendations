import { useCallback, useEffect, useState } from 'react';
import { discoverMovies, searchMovieByName } from '@API/requests';
import { LoadingMediaSection, MoviePoster } from '~/src/components';
import SearchForm from '~/src/components/SearchForm';
import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

interface SearchValues {
  genre: number;
  keyword: string;
}

interface Props {
  moviesInitData?: IMoviesResponse;
  keyword?: string;
  genre?: number;
}

const Search: NextPage<Props> = ({ keyword, genre, moviesInitData }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    setMovies(moviesInitData?.results || []);
  }, [moviesInitData]);

  const getMovies = useCallback(
    async (value: SearchValues) => {
      try {
        setIsSearching(true);
        if (value.keyword) {
          const searchResult = await searchMovieByName(
            value.keyword,
            value.genre,
          );
          setMovies(searchResult.results);
        } else {
          const searchResult = await discoverMovies({
            with_genres: value.genre,
          });
          setMovies(searchResult.results);
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setIsSearching(false);
      }
    },
    [enqueueSnackbar],
  );

  return (
    <>
      <SearchForm onChange={getMovies} keyword={keyword} genre={genre} />
      {isSearching ? (
        <LoadingMediaSection />
      ) : (
        <div className="grid grid-cols-12 gap-3 p-5">
          {movies?.map(movie => (
            <MoviePoster movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const queryClient = new QueryClient();
  const keyword = query.keyword as string;
  const genre = Number(query.genre as string);

  if (query.keyword) {
    await queryClient.prefetchQuery<IMoviesResponse>(
      ['movies', query.search],
      () => searchMovieByName(keyword, genre),
    );
  } else {
    await queryClient.prefetchQuery<IMoviesResponse>(['movies', ''], () =>
      discoverMovies({
        with_genres: genre,
      }),
    );
  }

  return {
    props: {
      keyword: (query.keyword as string) || '',
      genre: Number(query.genre as string),
      moviesInitData: (dehydrate(queryClient)?.queries?.[0]?.state?.data ||
        {}) as IMoviesResponse,
    },
  };
};
