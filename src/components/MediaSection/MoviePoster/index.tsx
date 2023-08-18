import Link from 'next/link';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { PlayIcon, StarIcon } from '@Icons';

const MoviePoster = ({ movie }: { movie: IMovie }) => {
  const stars: number[] = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);

  const rate: number = useMemo(
    () => movie.rating || movie.vote_average,
    [movie],
  );

  return (
    <div className="aspect-[2/3] col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 relative group mb-4 object-cover">
      <Link
        href={`/movies/${movie?.title
          ?.replaceAll(' ', '_')
          ?.toLowerCase()}/?id=${movie.id}`}
      >
        <a>
          <Image
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <div className="absolute inset-0 bg-black opacity-30 hidden group-hover:block" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 p-1 ">
            <PlayIcon color="white" />
          </div>
          <p className="absolute top-full text-white w-auto">{movie.title}</p>

          <div className="absolute bottom-0 bg-gray-500 opacity-50 w-full h-8 flex justify-center items-center group-hover:opacity-100">
            {stars.map(star => (
              <StarIcon
                key={star}
                className={`${
                  rate && rate >= star ? ' fill-404-yellow  ' : ''
                }`}
              />
            ))}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default MoviePoster;
