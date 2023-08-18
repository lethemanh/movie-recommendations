import React, { FC } from "react";
import { minutesToHoursAndMinutes } from "~/lib/utils/helpers";

const MovieTitle: FC<
  Pick<IMovieDetails, "title" | "original_title" | "release_date" | "runtime">
> = ({ title, original_title, release_date, runtime }) => {
  const year = new Date(release_date).getFullYear();
  const { hours, minutes, error } = minutesToHoursAndMinutes(runtime);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl  mb-4">{title}</h1>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col text-gray-400 space-y-0 text-sm md:text-md lg:text-lg xl:text-xl ">
          <h3>Original title: {original_title}</h3>
          <div>
            {year} &bull;{" "}
            <span>{error ? error.toString() : `${hours}h ${minutes}m`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
