import React, { FC } from "react";
import { getImageLink, getYoutubeLink } from "~/lib/utils/helpers";
import { PlayIcon } from "@Icons";
import Image from "next/image";
const MoviePictures: FC<
  { youtubeKey: string } & Pick<IMovieDetails, "poster_path" | "title">
> = ({ poster_path, title, youtubeKey }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-3 mt-8">
      <div className="col-span-6 lg:col-span-2 row-span-6 relative aspect-[2/3] min-w-min rounded-md overflow-clip">
        <Image src={getImageLink(poster_path!)} layout="fill" alt={title} />
      </div>
      <div className="col-span-12 order-last lg:col-span-8 lg:order-none  row-span-6 relative h-96 lg:h-auto">
        <iframe
          width={"100%"}
          height={"100%"}
          src={getYoutubeLink(youtubeKey)}
        />
      </div>
      <div className="grid col-span-6 lg:col-span-2  row-span-6 space-y-3">
        <div className="col-span-6 lg:col-span-12 row-span-1 bg-gray-700 bg-opacity-50 hover:bg-opacity-100 flex flex-col-reverse justify-center items-center ">
          <PlayIcon />
          <p>nice</p>
        </div>
        <div className="col-span-6 lg:col-span-12 row-span-1 bg-gray-700 bg-opacity-50 hover:bg-opacity-100 flex flex-col-reverse justify-center items-center ">
          <PlayIcon />
          <p>nice</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePictures;
