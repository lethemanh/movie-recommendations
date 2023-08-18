import React, { useMemo, useState } from 'react';
import { StarIcon } from '~/src/icons';

const RateStars = ({ rateMovie }: { rateMovie: (rate: number) => void }) => {
  const [rate, setRate] = useState<number | null>(null);
  const stars: number[] = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);
  return (
    <div
      className="flex flex-col items-center space-x-5 "
      onMouseLeave={() => {
        setRate(null);
      }}
    >
      <div className="text-white">Rate: {rate ?? 0}/10</div>
      <div className="flex flex-row">
        {stars.map(star => (
          <button
            onMouseEnter={() => {
              setRate(star);
            }}
            onClick={() => rateMovie(rate!)}
            key={star}
          >
            <StarIcon
              className={`${rate && rate >= star ? ' fill-404-yellow  ' : ''}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RateStars;
