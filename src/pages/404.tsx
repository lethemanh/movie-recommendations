import React from 'react';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';

const NotFound: NextPageWithLayout = () => {
  return (
    <div className="relative h-screen flex flex-row">
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-404-yellow" />
      <div className="flex-1 bg-404-teal" />
      <div className="flex-1 bg-404-green" />
      <div className="flex-1 bg-404-pink" />
      <div className="flex-1 bg-404-red" />
      <div className="flex-1 bg-404-blue" />
      <div className="flex-3 whitespace-nowrap w-full absolute text-center self-center ">
        <p className="bg-black text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl p-5 tracking-normal selection:tracking-widest selection:bg-white selection:text-black selection:space-x-3">
          OOPS NO SIGNAL
        </p>

        <Link href="/home">
          <a className="bg-black text-white px-4 py-2 font-semibold hover:border hover:border-transparent ">
            Click here to go home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
