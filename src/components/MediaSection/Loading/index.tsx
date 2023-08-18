import React from "react";
import { LoadingIcon } from "~/src/icons";

const LoadingMediaSection = () => {
  return (
    <div className="py-8 w-full  ">
      <div className="grid grid-cols-12 gap-3 m-5">
        {[1, 2, 3, 4, 5, 6].map((entry) => (
          <div
            key={entry}
            className="animate-pulse flex items-center justify-center bg-slate-400 aspect-[2/3] col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  mb-4  "
          >
            <LoadingIcon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingMediaSection;
