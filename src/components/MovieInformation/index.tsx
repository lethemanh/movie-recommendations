import React, { Dispatch, FC, SetStateAction } from 'react';
import { convertDollarsToMillions } from '~/lib/utils/helpers';
import { StarIcon, MoneyIcon } from '~/src/icons';

const MovieInformation: FC<{
  vote_average: number;
  budget: number;
  setShowRatingPopUp: Dispatch<SetStateAction<boolean>>;
}> = ({ vote_average, budget, setShowRatingPopUp }) => {
  return (
    <div className="md:flex flex-row space-x-5 self-end hidden ">
      <div className="text-center space-y-2">
        <p className="text-2xl">IMDB Rating</p>
        <div className="flex items-center space-x-2 justify-center">
          <StarIcon />
          <div>
            <span className="text-white text-lg font-bold">
              {vote_average.toFixed(2)}
            </span>
            <span className="text-sm">/10</span>
          </div>
        </div>
      </div>
      <div className="text-center space-y-2 ">
        <p className="text-2xl">Your rating</p>
        <button
          onClick={() => setShowRatingPopUp(true)}
          className="flex flex-row space-x-2 group mx-auto px-2 py-1 rounded bg-gray-500 bg-opacity-60 hover:bg-opacity-100 "
        >
          <StarIcon className="group-hover:fill-404-yellow" />
          <p>RATE</p>
        </button>
      </div>
      <div className="text-center space-y-2 ">
        <p className="text-2xl">Budget</p>
        <div className="flex flex-row space-x-2 ">
          <MoneyIcon color="green" />
          <p>{convertDollarsToMillions(budget)}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;
