import React, { FC } from "react";
import Chip from "../Chip";

const GenreChips: FC<Pick<IMovieDetails, "genres">> = ({ genres }) => {
  return (
    <div className="flex space-x-2">
      {genres.map((genre) => (
        <Chip key={genre.id}>{genre.name}</Chip>
      ))}
    </div>
  );
};

export default GenreChips;
