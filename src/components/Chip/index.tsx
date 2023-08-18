import Link from "next/link";
import React, { FC } from "react";

const Chip: FC<{ children: string }> = ({ children }) => {
  return (
    <Link href="#">
      <a>
        <div className="rounded-full border-[1px] px-3 py-1 hover:bg-white hover:bg-opacity-30">
          {children}
        </div>
      </a>
    </Link>
  );
};

export default Chip;
