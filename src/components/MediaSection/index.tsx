import { FC } from "react";

const MediaSection: FC<{
  children: () => JSX.Element;
}> = ({ children }) => {
  return <div className="py-8">{children()}</div>;
};

export default MediaSection;
