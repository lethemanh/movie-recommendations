import Link from 'next/link';
import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
  MovieInformation,
  MoviePictures,
  MovieTitle,
  GenreChips,
  RateStars,
} from '~/src/components';
import {
  getMovieDetails,
  getMovieVideos,
  rateMovie as rateMovieRequest,
  getMovieCredits,
} from '@API/requests';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

const MovieDetails: NextPage<
  IMovieDetails & {
    youtubeKey: string | null;
    cast: IMovieCredits['cast'];
  }
> = ({
  release_date,
  title,
  original_title,
  runtime,
  vote_average,
  budget,
  poster_path,
  youtubeKey,
  genres,
  overview,
  id,
  production_countries,
  production_companies,
  cast,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [showRatingPopUp, setShowRatingPopUp] = useState<boolean>(false);

  const rateMovie = async (rate: number) => {
    try {
      const sessionId = JSON.parse(
        Cookies.get('userToken') as string,
      )?.session_id;
      await rateMovieRequest({ movieId: id.toString(), rate, sessionId });
      enqueueSnackbar('Rated success!', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setShowRatingPopUp(false);
    }
  };

  return (
    <>
      {showRatingPopUp ? (
        <div className="fixed h-screen w-screen bg-black opacity-75 flex justify-center items-center z-10 ">
          <RateStars rateMovie={rateMovie} />
        </div>
      ) : null}
      <div className=" flex flex-col items-center">
        <div className="pt-24 max-w-xl md:max-w-3xl lg:max-w-5xl   min-h-screen text-white space-y-4">
          <div className="flex flex-col items-start md:items-end md:justify-between md:flex-row  ">
            <MovieTitle {...{ release_date, original_title, runtime, title }} />
            <MovieInformation
              {...{ budget, vote_average, setShowRatingPopUp }}
            />
          </div>
          <MoviePictures
            poster_path={poster_path}
            youtubeKey={youtubeKey ?? ''}
            title={title}
          />
          <GenreChips genres={genres} />
          <div className="grid grid-cols-12 w-full lg:space-x-20 scroll-auto ">
            <div className="col-span-12 order-1 lg:col-span-9 lg:order-none space-y-3">
              <p>{overview}</p>
              {!!production_countries.length &&
                !!production_companies.length && (
                  <>
                    <hr />
                    <p className="text-lg ">
                      <span className="font-bold ">Produced by </span>
                      <Link href="#">
                        <a className="text-blue-600 hover:text-blue-200 font-semibold ">
                          {production_companies[0].name}{' '}
                        </a>
                      </Link>
                      <span className="font-bold">
                        in {production_countries[0].name}{' '}
                      </span>
                    </p>
                  </>
                )}
              <hr />
              <div className="text-lg ">
                <span className="font-bold ">Actors: </span>
                <ul>
                  {cast.slice(0, 4).map(member => (
                    <li key={member.cast_id}>
                      {member.name} as {member.character}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;

export const getServerSideProps: GetServerSideProps<
  IMovieDetails & { youtubeKey: string | undefined },
  { slug: string }
> = async ({ query }) => {
  if (!query.id) {
    return {
      notFound: true,
    };
  }
  const details = await getMovieDetails(query.id as string);

  const videos = await getMovieVideos(details.id);
  const { cast } = await getMovieCredits(query.id as string);
  const youtubeKey =
    videos.results.find(video => video.site === 'YouTube')?.key ?? '';
  return {
    props: {
      ...details,
      youtubeKey,
      cast,
    },
  };
};
