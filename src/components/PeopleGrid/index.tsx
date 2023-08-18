import React from "react";
import Image from "next/image";
import { getImageLink } from "~/lib/utils/helpers";
const PeopleGrid = ({
  people,
  movieName,
}: {
  people: any[];
  movieName: string;
}) => {
  return (
    <>
      <h1 className="mb-9 text-white text-left block text-5xl font-semibold">
        {movieName} Actors
      </h1>
      <ul className="grid grid-cols-12 gap-8">
        {people.map((member) => (
          <li
            key={member.id}
            className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
          >
            <div className="relative min-w-full aspect-[3/4]">
              <Image
                objectFit="cover"
                src={getImageLink(member.profile_path)}
                alt={member.name}
                layout="fill"
              />
            </div>
            <p className="text-white">
              {member.name} as {member.character}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PeopleGrid;
